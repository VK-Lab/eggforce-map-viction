import { useState, useMemo, useEffect, useCallback } from 'react';
import GModal from '@/components/GModal';
import isString from 'lodash/isString';
import isEqual from 'lodash/isEqual';
import useCurrentUser from '@/hooks/useCurrentUser';
import MODULES_PERMISSION from '@/constants/modulesPermission';
import { reloadCurrentUser } from '@/modules/Auth/actions';
import {
  useAppSelector as useSelector,
  useAppDispatch as useDispatch,
} from '@/app/hooks';
import { executeErrorMessage } from '@/services/errorsWrapper';
import { sharedToastProps, toast } from '@/services/toast';
import useFetchEggPackages from '@/hooks/useFetchEggPackages';
import {
  selectCutomPackModalStore,
  selectPackagesDetailStore,
} from '@/modules/WorldMint/selectors';
import { selectAuth } from '@/modules/Auth/selectors';
import { packagesDetailActions } from '@/modules/WorldMint/store';
import PackageItems from './PackageItems';
import PurchaseStatusModal from './PurchaseStatusModal';
import PurchaseCounter from './PurchaseCounter';
import PurchaseConfirmPackageModal from './PurchaseConfirmPackageModal';
// eslint-disable-next-line
import AccountMiniHeader from '@/components/AccountMiniHeader';
import type { TypePurchasePackageParams } from '@/types/package';
import { handleDeployResult } from '@/modules/EggPurchase/actions';
import { moteToCspr } from '@/helpers/balance';
import messages from './messages';
import commonMessages from '@/constants/commonMessages';

interface IProps {
  onClose?: () => void;
  open?: boolean;
  isDeploying?: boolean;
  className?: string;
  onMint: (data: any) => void;
  onClaimHandler: () => void;
}

const QuickBuyModal = ({
  className,
  open = false,
  isDeploying = false,
  onMint,
  onClose,
  onClaimHandler,
}: IProps) => {
  const hideManualController = MODULES_PERMISSION.LIMIT_EGG_PURCHASE === false;
  const hidePackagesList = MODULES_PERMISSION.LIMIT_EGG_PURCHASE === true;
  const formatter = '0,0[.]00';
  const { packages, pricePerEgg } = useSelector(selectPackagesDetailStore);
  const customPackModal = useSelector(selectCutomPackModalStore);
  const storeAuth = useSelector(selectAuth, isEqual);
  // eslint-disable-next-line
  const { permissions } = storeAuth;

  const dispatch = useDispatch();
  const user = useCurrentUser();
  const [isPurchaseSuccess, setPurchaseStatus] = useState<boolean | undefined>(
    undefined,
  );
  const [selectedPackageIndex, setSelectedPackage] = useState<number | null>(
    null,
  );
  const [onPurchaseResultOpen, setPurchaseResultOpen] =
    useState<boolean>(false);
  const [onPurchaseReviewOpen, setPurchaseReviewOpen] =
    useState<boolean>(false);

  useFetchEggPackages();

  const onCloseHandler = useCallback(() => {
    onClose && onClose();
  }, [onClose]);
  const onClosePurchaseReviewModal = useCallback(
    () => setPurchaseReviewOpen(false),
    [],
  );
  const onClosePurchaseCustomModal = useCallback(
    () => dispatch(packagesDetailActions.hideCustomPackModal()),
    [dispatch],
  );
  const onClosePurchaseStatusModal = useCallback(() => {
    setPurchaseResultOpen(false);

    if (customPackModal.open) {
      onClosePurchaseCustomModal();
    }
  }, [onClosePurchaseCustomModal, customPackModal]);

  const onBuyProcessHandler = useCallback(
    async (data: any) => {
      try {
        // TypePurchasePackageParams | TypePurchasePackageBNPLParams
        const { amountEgg, isInstallmentPayment = false } = data;

        if (!user) {
          return;
        }

        const userBalance = isString(user.balance)
          ? BigInt(user.balance)
          : BigInt(0);
        let purchaseParams: unknown;
        let actionPrimary: any;

        /**
         * Setup params for casual Purchase
         * Use onMint
         */
        if (!isInstallmentPayment) {
          const { totalPackageValue } = data;
          const amountFee = BigInt(0);
          const amountPackage = totalPackageValue;
          const amountLocked = amountPackage + amountFee;

          if (userBalance === BigInt(0) || amountLocked > userBalance) {
            toast.warn(commonMessages.errNotEnoughBalance.defaultMessage, {
              ...sharedToastProps,
              toastId: commonMessages.errNotEnoughBalance.id,
            });
            return;
          }

          purchaseParams = {
            totalPackageValue,
            amountEgg,
          } as TypePurchasePackageParams;
          actionPrimary = onMint;
        }
        console.log(`🚀 ~ purchaseParams:`, purchaseParams);
        /**
         * TODO VIC: PURCHASE
         */
        // Sending package params to useEggMinting
        const result: any = await actionPrimary(purchaseParams);

        if (result) {
          await dispatch(
            handleDeployResult({
              result,
              metadata: {
                from: 'purchase',
                id: amountEgg,
                action: 'mint',
              },
              onCompleted: () => {
                setPurchaseStatus(true);
                setPurchaseResultOpen(true);
              },
            }),
          );
        }
        onClosePurchaseReviewModal();
      } catch (error: any) {
        executeErrorMessage(error);
        onClosePurchaseReviewModal();
        return;
      } finally {
      }
    },
    [dispatch, onClosePurchaseReviewModal, onMint, user],
  );

  const onSelectPackageHandler = useCallback(async (selectedIndex: number) => {
    setSelectedPackage(selectedIndex);
    setPurchaseReviewOpen(true);
  }, []);

  const onSelectCustomPackageHandler = useCallback(() => {
    dispatch(packagesDetailActions.showCustomPackModal());
  }, [dispatch]);

  const onConfirmPurchasePackage = useCallback(
    async (data: any) => {
      await onBuyProcessHandler(data);
    },
    [onBuyProcessHandler],
  );

  const renderPrimaryActions = useMemo(() => {
    if (!hidePackagesList) {
      return (
        <PackageItems
          formatter={formatter}
          packages={packages}
          onSelect={onSelectPackageHandler}
          onSelectCustomPack={onSelectCustomPackageHandler}
          isDeploying={isDeploying}
        />
      );
    }

    if (!hideManualController) {
      return (
        <PurchaseCounter
          pricePerEgg={moteToCspr(pricePerEgg)}
          // onBuyProcessHandler={onBuyProcessHandler}
          onBuyProcessHandler={async (eggAmount: number) => {
            await onSelectPackageHandler(eggAmount);
          }}
          messages={messages}
          isDeploying={isDeploying}
        />
      );
    }
  }, [
    hideManualController,
    hidePackagesList,
    isDeploying,
    onSelectCustomPackageHandler,
    onSelectPackageHandler,
    packages,
    pricePerEgg,
  ]);

  useEffect(() => {
    if (!user) {
      return;
    }

    if (user.activeKey && !('balance' in user)) {
      dispatch(reloadCurrentUser(user.activeKey));
    }
  }, [user, dispatch]);

  useEffect(() => {
    return () => {
      setPurchaseStatus(undefined);
      setPurchaseResultOpen(false);
    };
  }, []);

  return (
    <GModal
      show={open}
      backdrop="static"
      keyboard={false}
      onHide={onCloseHandler}
      className={className}
    >
      <div className="quickbuy-body">
        <AccountMiniHeader />
        {renderPrimaryActions}
        <PurchaseStatusModal
          open={onPurchaseResultOpen}
          onClose={onClosePurchaseStatusModal}
          isSuccess={isPurchaseSuccess}
          isCustomPack={Boolean(customPackModal.open)}
        />
        <PurchaseConfirmPackageModal
          formatter={formatter}
          open={onPurchaseReviewOpen}
          packages={packages}
          selectedPackageIndex={selectedPackageIndex}
          isDeploying={isDeploying}
          onConfirm={onConfirmPurchasePackage}
          onClose={onClosePurchaseReviewModal}
        />
      </div>
      <div className="body--bottom-gradient"></div>
    </GModal>
  );
};

export default QuickBuyModal;
