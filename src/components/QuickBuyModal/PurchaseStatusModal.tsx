import GModal from '@/components/GModal';
import { Check2Circle, Boxes, InfoCircle } from 'react-bootstrap-icons';
import GNotificationModal from '@/components/GNotificationModal';
import { Heading } from '@/components/Typography';
import { useMemo } from 'react';
import CommonMessage from '@/components/CommonMessages';
import purchaseMessages from '@/components/QuickBuyModal/messages';

interface IProps {
  onClose: () => void;
  open?: boolean;
  className?: string;
  isSuccess?: boolean;
  isCustomPack?: boolean;
}

const PurchaseStatusModal = (props: IProps) => {
  const { onClose, open, isSuccess, isCustomPack = false } = props;
  const { title, icon, msg } = useMemo(() => {
    return {
      msg: !isSuccess
        ? CommonMessage.Failed
        : isCustomPack
        ? CommonMessage.Info
        : CommonMessage.Success,
      title: !isSuccess
        ? purchaseMessages.purchaseFailed.defaultMessage
        : purchaseMessages.purchaseSuccess.defaultMessage,
      icon: () => (!isSuccess ? <Boxes /> : <Check2Circle />),
    };
  }, [isCustomPack, isSuccess]);

  return (
    <GModal closeButton={false} show={open} className={'purchase-result'}>
      <GNotificationModal
        labelConfirm={'I understand'}
        className="quickbuy-package--purchase-status"
        onClose={onClose}
        icon={icon()}
      >
        <Heading h={4}>{title}</Heading>
        <p className="helper">
          <InfoCircle className="icon--helper" />
          {msg}
        </p>
      </GNotificationModal>
    </GModal>
  );
};

export default PurchaseStatusModal;
