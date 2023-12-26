import { useMemo, useCallback } from 'react';
import { QuestionCircleFill } from 'react-bootstrap-icons';
import GModal from '@/components/GModal';
import Button from '@/components/GButton';
import { sharedToastProps, toast } from '@/services/toast';
import isEmpty from 'lodash/isEmpty';
import iconHatch from '@/assets/images/icon--hatch.png';
import type { NFTItem } from '@/types/NFTItem';
import {
  selectDragonMakeStatusModal,
  selectDragonMakeConfirmModal,
} from '@/modules/DragonManagementModule/selectors';
import { selectNFTDetailModal } from '@/modules/NFTDetail/selectors';
import { dragonManagementActions } from '@/modules/DragonManagementModule/store';
import {
  useAppDispatch as useDispatch,
  useAppSelector as useSelector,
} from '@/app/hooks';
import messagesDetail from '@/components/NFTDetailViewModal/messages';
import EggEvolveInstructrionModal from './EggEvolveInstructrionModal';
import useCheckBalance from '@/hooks/useCheckBalance';
import { csprToMote } from '@/helpers/balance';
import { evoluteEggToDragonProcess } from '@/modules/EggHatching/actions';
import { handleDeployResult } from '@/modules/EggPurchase/actions';
import { lockAndReloadEggDetail } from '@/modules/NFTDetail/actions';
import EggEvolveToDragonStatusModal from '@/components/EggEvolveToDragonStatusModal';
import useDragonDrop from '@/hooks/useDragonDrop';
import { getNFTDetails } from '@/modules/NFTDetail/utils';
import NetworkFeePanel from '@/components/NetworkFeePanel';
import commonMessages from '@/constants/commonMessages';
import LoadingBox from '@/components/LoadingBox';
import { NFTEggStatus } from '@/types/NFTItem';

const EggEvolveDragonConfirmModal = () => {
  const MAKE_DRAGON_PAYMENT_AMOUNT = 30;
  const { makeDragon, isDeploying } = useDragonDrop();
  const { checkBalanceAgainstAmount } = useCheckBalance();
  const dispatch = useDispatch();
  const { open } = useSelector(selectDragonMakeConfirmModal);
  const { loading: statusLoading } = useSelector(selectDragonMakeStatusModal);
  const NFTDetailStore = useSelector(selectNFTDetailModal);
  const { data: dataNFTDetail } = NFTDetailStore;
  const {
    token_uri: image,
    tokenId,
    egg,
    isInstallment,
  } = useMemo(() => {
    try {
      if (!dataNFTDetail) {
        throw new Error('NFTData is missing');
      }
      return getNFTDetails(dataNFTDetail as NFTItem);
    } catch (error: any) {
      return {
        token_uri: null,
        tokenId: null,
        egg: null,
        isInstallment: null,
      };
    }
  }, [dataNFTDetail]);
  const onCloseHandler = useCallback(() => {
    dispatch(dragonManagementActions.hideMakeConfirmModal());
  }, [dispatch]);
  const shouldDisableDragronMakeButton = useMemo(() => {
    return Boolean(
      isInstallment ||
        isDeploying ||
        statusLoading ||
        egg?.status === NFTEggStatus.incubating ||
        egg?.isProcessing,
    );
  }, [
    egg?.isProcessing,
    egg?.status,
    isDeploying,
    isInstallment,
    statusLoading,
  ]);

  const onEvolveDragon = useCallback(async () => {
    try {
      // Prevent making Dragon when not enough balance
      if (!checkBalanceAgainstAmount(csprToMote(MAKE_DRAGON_PAYMENT_AMOUNT))) {
        toast.warn(messagesDetail.makeDragonNotEnoughCSPR.defaultMessage, {
          ...sharedToastProps,
          autoClose: true,
        });
        return;
      }

      const result: any = await dispatch(
        evoluteEggToDragonProcess({
          makeDragon,
          tokenId: String(tokenId),
          paymentAmount: csprToMote(MAKE_DRAGON_PAYMENT_AMOUNT),
        }),
      ).unwrap();

      if (result) {
        dispatch(dragonManagementActions.setMakeStatusModal(true));
        dispatch(dragonManagementActions.showMakeStatusModal());

        await dispatch(
          handleDeployResult({
            result: result?.deployResult,
            message: `Egg evolution process for token ${tokenId} is sent`,
            toastId: `egg-evolution-${tokenId}`,
            metadata: {
              from: 'nftDetail',
              id: tokenId,
              action: 'dragon making',
            },
            configs: {
              skipStoringDeploy: isEmpty(result?.deployResult),
            },
            onCompleted: () => {
              dispatch(lockAndReloadEggDetail({ tokenId }));
              dispatch(dragonManagementActions.setMakeStatusLoading(false));
            },
          }),
        );

        return result;
      }
    } catch (err: any) {
      console.log(`🚀 ~ onEvolveToDragon ~ err:`, err.message);
      toast.warn(messagesDetail.makeDragonFailed.defaultMessage, {
        ...sharedToastProps,
        autoClose: true,
      });
      dispatch(dragonManagementActions.setMakeStatusLoading(false));
    } finally {
      // onHideConfirmModalHandler();
    }
  }, [checkBalanceAgainstAmount, dispatch, makeDragon, tokenId]);

  const onClickMakeDragonInstructionModal = useCallback(() => {
    dispatch(dragonManagementActions.showMakeInstructionModal());
  }, [dispatch]);

  if (!open || !dataNFTDetail) {
    return null;
  }

  return (
    <GModal
      blurOverlay
      show={open}
      className={'egg-evolve-dragon-confirm--modal'}
      onHide={onCloseHandler}
      disabledClose={isDeploying}
    >
      <div className="body-wrapper">
        <img src={image.value} alt="Egg" className="egg-evolve-dragon--egg" />
      </div>

      <NetworkFeePanel fee={MAKE_DRAGON_PAYMENT_AMOUNT} isMote={false} />
      <div className="actions">
        <Button
          disabled={shouldDisableDragronMakeButton}
          className="inside-nft-detail btn--nft-action btn--evolve-dragon"
          onClick={onEvolveDragon}
          btnStyle="5"
          size="xl"
        >
          {statusLoading ? (
            <>
              <LoadingBox
                isHorizontal
                label="MAKING DRAGON"
                className="loading--making-dragon"
                minHeight={32}
              />
            </>
          ) : (
            <>
              <img
                className="icon icon--claim-snc"
                src={iconHatch}
                alt={commonMessages.labelDragonHatch.defaultMessage}
              />
              {commonMessages.labelDragonHatch.defaultMessage}
            </>
          )}
        </Button>
        <button
          onClick={onClickMakeDragonInstructionModal}
          className={'icon--how-to-merge'}
        >
          <QuestionCircleFill />
        </button>
      </div>
      <EggEvolveInstructrionModal />
      <EggEvolveToDragonStatusModal onClose={onCloseHandler} />
    </GModal>
  );
};

export default EggEvolveDragonConfirmModal;
