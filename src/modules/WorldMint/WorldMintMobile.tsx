import { useCallback, useState } from 'react';
import Button from '@/components/GButton';
import {
  useAppDispatch as useDispatch,
  useAppSelector as useSelector,
} from '@/app/hooks';
import GenericErrorModal from '@/components/GenericErrorModal';
import useFetchEggPackages from '@/hooks/useFetchEggPackages';
import { selectCutomPackModalStore } from '@/modules/WorldMint/selectors';
import { packagesDetailActions } from '@/modules/WorldMint/store';
import PurchaseStatusModal from '@/components/QuickBuyModal/PurchaseStatusModal';

const WorldMintMobile = () => {
  const dispatch = useDispatch();
  useFetchEggPackages();
  const customPackModal = useSelector(selectCutomPackModalStore);
  const [onPurchaseResultOpen, setPurchaseResultOpen] =
    useState<boolean>(false);
  const [isPurchaseSuccess] = useState<boolean | undefined>(undefined);

  const onClickMintHandler = useCallback(() => {
    dispatch(packagesDetailActions.showCustomPackModal());
  }, [dispatch]);
  const onClosePurchaseCustomModal = useCallback(() => {
    dispatch(packagesDetailActions.hideCustomPackModal());
  }, [dispatch]);
  const onClosePurchaseStatusModal = useCallback(() => {
    setPurchaseResultOpen(false);

    if (customPackModal.open) {
      onClosePurchaseCustomModal();
    }
  }, [customPackModal, onClosePurchaseCustomModal]);

  return (
    <div>
      <Button className="btn--open-mint-modal" onClick={onClickMintHandler}>
        <span>MINT EGG</span>
      </Button>
      <PurchaseStatusModal
        open={onPurchaseResultOpen}
        onClose={onClosePurchaseStatusModal}
        isSuccess={isPurchaseSuccess}
        isCustomPack
      />
      <GenericErrorModal />
    </div>
  );
};

export default WorldMintMobile;
