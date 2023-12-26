import { useState, useMemo, useCallback } from 'react';
import { axios } from '@/services/axios';
import { useAppDispatch as useDispatch } from '@/app/hooks';
import CONFIG from '@/constants/settings';
import type { DroppedItemSpec } from '@/types/EggMerge';
import isEmpty from 'lodash/isEmpty';
import API from '@/constants/api';
import commonMesssages from '@/constants/commonMessages';
import { toast, sharedToastProps } from '@/services/toast';
import messages from '@/modules/EggMerging/messages';
import { ItemTypes, EggPlaceholderState } from '@/types/EggMerge';
import useConfirmDeploy from './useConfirmDeploy';
import useCurrentUser from '@/hooks/useCurrentUser';
import { executeErrorMessage } from '@/services/errorsWrapper';
import { eggMergingActions } from '@/modules/EggMerging/store';
import { handleDeployResult } from '@/modules/EggPurchase/actions';
import { lockEggWidthIds } from '@/modules/EggCollection/actions';
import type { SignedDeployResult } from '@/types/deploy';
import Big from 'big.js';
import useCheckBalance from './useCheckBalance';

const INITAL_STATE: EggPlaceholderState[] = [
  { accepts: [ItemTypes.EGG], slot: 1, lastDroppedItem: null },
  { accepts: [ItemTypes.EGG], slot: 2, lastDroppedItem: null },
  { accepts: [ItemTypes.EGG], slot: 3, lastDroppedItem: null },
  { accepts: [ItemTypes.EGG], slot: 4, lastDroppedItem: null },
  { accepts: [ItemTypes.EGG], slot: 5, lastDroppedItem: null },
];

interface useEggMergingProps {
  eggs: Array<any>;
  refetch: () => void;
}

const useEggMerging = ({ eggs = [], refetch }: useEggMergingProps) => {
  const dispatch = useDispatch();
  const user = useCurrentUser();
  const { checkBalanceAgainstAmount } = useCheckBalance();
  const { isDeploying, isError } = useConfirmDeploy();
  const [eggPlaceholders, setEggPlaceholders] =
    useState<EggPlaceholderState[]>(INITAL_STATE);
  const paymentAmount = useMemo(() => {
    const validEggs = eggPlaceholders.filter((slot: EggPlaceholderState) => {
      return Boolean(slot.lastDroppedItem);
    });

    const payment = Big(CONFIG.MERGE_PAYMENT_AMOUNT).mul(validEggs.length);
    return payment.toNumber();
  }, [eggPlaceholders]);
  const [droppedEggIds, setDroppedEggIds] = useState<string[]>([]);
  const shouldDisableMergeButton = useMemo(() => {
    if (isDeploying) {
      return true;
    }

    const isEmptyAllSlots = eggPlaceholders.every(
      (slot) => !slot.lastDroppedItem,
    );

    if (isEmptyAllSlots) {
      return true;
    }

    return false;
  }, [eggPlaceholders, isDeploying]);

  const onCleanUpAfterMerge = useCallback(
    (mergingEggs: EggPlaceholderState[]) => {
      setEggPlaceholders(INITAL_STATE);
      setDroppedEggIds([]);

      const tokenIds = mergingEggs
        .filter((slot: EggPlaceholderState) => Boolean(slot.lastDroppedItem))
        .map((slot: EggPlaceholderState) => slot.lastDroppedItem!.tokenId);

      // Temp lock every eggs from merging process
      if (tokenIds?.length) {
        dispatch(lockEggWidthIds(tokenIds));
      }
    },
    [dispatch],
  );

  const getDroppedEgg = useCallback(
    (id: string | undefined) => {
      if (!id) {
        return undefined;
      }
      const item = eggs?.find((item: any) => item.tokenId === id);
      return item;
    },
    [eggs],
  );

  const isDropped = useCallback(
    (boxName: string) => {
      return droppedEggIds.indexOf(boxName) > -1;
    },
    [droppedEggIds],
  );

  const removeDroppedTokenIds = useCallback(
    (removeItemId: string) => {
      const newDroppedEggs = droppedEggIds.filter(
        (name) => name !== removeItemId,
      );
      setDroppedEggIds(newDroppedEggs);
    },
    [droppedEggIds],
  );
  const handleDrop = useCallback(
    (slotId: number, item: DroppedItemSpec) => {
      const newBins = eggPlaceholders.map((src) => {
        if (src.slot === slotId) {
          return {
            ...src,
            lastDroppedItem: item,
          };
        }

        return src;
      });
      const newDroppedEggIds = newBins
        .map((slot) => slot.lastDroppedItem?.tokenId)
        .filter(Boolean);

      // Set latest egg placeholders
      setEggPlaceholders(newBins);

      // Quick set latest dropped Ids
      if (newDroppedEggIds.length) {
        setDroppedEggIds(newDroppedEggIds as string[]);
      }
    },
    [eggPlaceholders],
  );
  const handleRemove = useCallback(
    (removeItemId: any) => {
      const newBins = eggPlaceholders.map((src) => {
        if (src.lastDroppedItem?.tokenId === removeItemId) {
          return {
            ...src,
            lastDroppedItem: null,
          };
        }

        return src;
      });

      setEggPlaceholders(newBins);
      removeDroppedTokenIds(removeItemId);
    },
    [eggPlaceholders, removeDroppedTokenIds],
  );

  const validate = useCallback(() => {
    const validSlots = eggPlaceholders.filter(
      (slot) => slot.lastDroppedItem?.tokenId,
    );

    if (validSlots.length < 2) {
      toast.info(messages.errorLessThanTwo.defaultMessage, {
        ...sharedToastProps,
        toastId: messages.errorLessThanTwo.id,
      });
      return false;
    }

    const primarySlot = eggPlaceholders[0].lastDroppedItem;

    if (!primarySlot) {
      toast.info(messages.errorMissingPrimaryElement.defaultMessage, {
        ...sharedToastProps,
        toastId: messages.errorMissingPrimaryElement.id,
      });
      return false;
    }

    if (primarySlot) {
      const invalidSlot = eggPlaceholders.some((slot) => {
        return (
          slot.lastDroppedItem &&
          slot.lastDroppedItem.classNFT !== primarySlot.classNFT
        );
      });

      if (invalidSlot) {
        toast.info(messages.errorMixedElementEggs.defaultMessage, {
          ...sharedToastProps,
          toastId: messages.errorMixedElementEggs.id,
        });
        return false;
      }
    }

    return true;
  }, [eggPlaceholders]);

  const onStartMerge = useCallback(
    async (currentEggs: EggPlaceholderState[]) => {
      try {
        if (!user) {
          throw new Error('Missing public key');
        }

        /**
         * Checking balance
         */
        if (!checkBalanceAgainstAmount(paymentAmount)) {
          toast.warn(commonMesssages.errNotEnoughBalance.defaultMessage, {
            ...sharedToastProps,
            toastId: commonMesssages.errNotEnoughBalance.id,
          });
          return;
        }

        // Reset result status
        dispatch(eggMergingActions.setMergeStatusResult(false));
        const otherEggs = currentEggs
          .filter((slot: EggPlaceholderState) => {
            if (slot.slot === 1) {
              return false;
            }

            return Boolean(slot.lastDroppedItem);
          })
          .map((slot: EggPlaceholderState) => slot.lastDroppedItem!.tokenId);
        const data = {
          tokenId: currentEggs[0].lastDroppedItem!.tokenId,
          mergedTokenIds: otherEggs,
          paymentAmount,
        };

        // TODO: FIX FOR VIC
        const deployResult = {} as SignedDeployResult;
        console.log(`🚀 ~ deployResult:`, deployResult);

        if (
          !deployResult ||
          isEmpty(deployResult) ||
          !deployResult?.signedDeploy
        ) {
          return;
        }

        const response = await axios.post(
          API.merge(data.tokenId),
          deployResult.signedDeploy,
        );

        if (response?.status === 200 && response?.data?.result) {
          dispatch(eggMergingActions.setMergeStatusResult(true));
          dispatch(eggMergingActions.showMergeStatusModal());
          await dispatch(
            handleDeployResult({
              result: {
                deployHash: deployResult.deployHash,
                signedDeploy: deployResult.signedDeploy,
              },
              message: `Merge request for token ${data.tokenId} is sent`,
              metadata: {
                from: 'merge',
                id: data.tokenId,
                action: 'merge',
              },
              toastId: `Merge-${data.tokenId}`,
              onCompleted: () => {},
            }),
          ).unwrap();

          onCleanUpAfterMerge(currentEggs);
          refetch();
        }

        return response;
      } catch (error: any) {
        executeErrorMessage(error);
        return undefined;
      }
    },
    [
      checkBalanceAgainstAmount,
      dispatch,
      onCleanUpAfterMerge,
      paymentAmount,
      refetch,
      user,
    ],
  );

  return {
    paymentAmount,
    eggPlaceholders,
    getDroppedEgg,
    validate,
    shouldDisableMergeButton,
    merge: onStartMerge,
    isDropped,
    handleDrop,
    handleRemove,
    isDeploying,
    isError,
  };
};
export default useEggMerging;
