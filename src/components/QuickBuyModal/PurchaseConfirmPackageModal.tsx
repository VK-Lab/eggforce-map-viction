import React, { useCallback, useMemo } from 'react';
import cn from 'classnames';
import isEmpty from 'lodash/isEmpty';
import useCurrentUser from '@/hooks/useCurrentUser';
import GModal from '@/components/GModal';
import Button from '@/components/GButton';
import { Heading } from '@/components/Typography';
import type { PackageClientItemType } from './PackageItems';
import type { TypePurchasePackageParams } from '@/types/package';
import TablePackageSummary from '@/components/TablePackageSummary';
import AccountMiniHeader from '@/components/AccountMiniHeader';
import useBlockMinting from '@/hooks/useBlockMinting';
interface IProps {
  packages: PackageClientItemType[];
  formatter: string;
  open?: boolean;
  className?: string;
  selectedPackageIndex: number | null;
  onClose: () => void;
  onConfirm: (data: unknown) => void;
  isDeploying?: boolean;
}

const PurchaseConfirmPackageModal = (props: IProps) => {
  const user = useCurrentUser();
  const {
    isDeploying,
    onConfirm,
    onClose,
    open,
    packages,
    selectedPackageIndex,
  } = props;
  const { shouldDisable } = useBlockMinting({ isDeploying });
  const selectedPackage =
    selectedPackageIndex !== null ? packages[selectedPackageIndex] : undefined;

  const shouldDisablePurchase = useMemo(() => {
    if (shouldDisable) {
      return true;
    }

    return false;
  }, [shouldDisable]);

  const validate = useCallback(() => {
    let error: any = {};

    return error;
  }, []);
  const data = useMemo(() => {
    if (!selectedPackage) {
      return undefined;
    }

    const amountFee = BigInt(0);
    const hasDiscountPrice = Boolean(selectedPackage.percent > 0);
    const priceInUse = hasDiscountPrice
      ? BigInt(selectedPackage.priceSale)
      : BigInt(selectedPackage.priceDefault);

    const packageLabel = `${selectedPackage.name} (${selectedPackage.amount} ${
      selectedPackage.amount > 1 ? `eggs` : `egg`
    })`;
    const amountLocked = priceInUse + amountFee;

    return {
      packagePrice: priceInUse,
      packageLabel,
      amountFee: amountFee,
      amountLocked: amountLocked,
    };
  }, [selectedPackage]);

  const onConfirmHandler = useCallback(() => {
    const result = validate();

    if (!data || !selectedPackage || !isEmpty(result)) {
      return;
    }

    /**
     * TODO VIC: prepare data before purchasing in QuickBuyMOdal
     */
    onConfirm({
      totalPackageValue: data.packagePrice,
      amountEgg: selectedPackage.amount,
      buy_for: '',
      isBuyForChecked: false,
      isInstallmentPayment: false,
      affiliateCode: '',
    } as TypePurchasePackageParams);
  }, [data, onConfirm, selectedPackage, validate]);

  if (!user || !selectedPackage || !data) {
    return null;
  }

  return (
    <GModal show={open} className={'purchase-review'} onHide={onClose}>
      <div className="purchase-review--root">
        <Heading h={3} className="mb-3">
          Purchase Details
        </Heading>
        <AccountMiniHeader />
        <div className="purchase-review--wrapper">
          <div className={cn('payment-details--summary')}>
            <div style={{ marginTop: 48 }}>
              <TablePackageSummary data={data} />
            </div>
          </div>
          <Button
            disabled={shouldDisablePurchase}
            onClick={onConfirmHandler}
            btnStyle="1"
            className="btn--confirm-purchase-package"
          >
            Purchase
          </Button>
          <div className="content-wrapper">
            <p className="helper">Please double check all info below</p>
            <ul>
              <li>
                Verify that you have selected the correct package and have a
                sufficient balance in your wallet account.
              </li>
              <li>Once signed, transaction cannot be cancelled.</li>
              <li>
                (*) Locked amount is reserved until minting process finished.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </GModal>
  );
};

export default PurchaseConfirmPackageModal;
