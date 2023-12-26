import GModal from '@/components/GModal';
import { Check2Circle, Boxes, InfoCircle } from 'react-bootstrap-icons';
import GNotificationModal from '@/components/GNotificationModal';
import { Heading } from '@/components/Typography';
import { useMemo } from 'react';

interface IProps {
  onClose: () => void;
  open?: boolean;
  className?: string;
  isSuccess?: boolean;
}

const EggHatchStatusModal = (props: IProps) => {
  const { onClose, open, isSuccess } = props;
  const { title, icon, msg } = useMemo(() => {
    const successMessage = (
      <span>
        Please wait for a few minutes to make sure your incubation is success.
        You can check the result via Notification located at top right.
      </span>
    );
    const failedMessage = (
      <span>
        No worries, it's on us and we've been notified. Truly sorry for this
        inconvenience.
      </span>
    );
    return {
      msg: !isSuccess ? failedMessage : successMessage,
      title: !isSuccess
        ? `Incubating wasn't completed!`
        : `Incubation process sent!`,
      icon: () => (!isSuccess ? <Boxes /> : <Check2Circle />),
    };
  }, [isSuccess]);

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

export default EggHatchStatusModal;
