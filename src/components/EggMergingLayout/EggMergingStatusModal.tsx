import { useMemo, useCallback } from 'react';
import GModal from '@/components/GModal';
import { Check2Circle, Boxes, InfoCircle } from 'react-bootstrap-icons';
import GNotificationModal from '@/components/GNotificationModal';
import { Heading } from '@/components/Typography';
import type { RootState } from '@/app/store';
import { useAppSelector as useSelector } from '@/app/hooks';
import CommonMessage from '@/components/CommonMessages';
import messages from '@/modules/EggMerging/messages';
import type { TypeMergeStatusModal } from '@/modules/EggMerging/store';

interface EggMergingStatusModalProps {
  selector: (data: RootState) => TypeMergeStatusModal;
  onClose: () => void;
}

const EggMergingStatusModal = ({
  selector,
  onClose,
}: EggMergingStatusModalProps) => {
  const { open, result: isSuccess } = useSelector(selector);
  const onCloseHandler = useCallback(() => {
    onClose();
  }, [onClose]);
  const { title, icon, msg } = useMemo(() => {
    return {
      msg: !isSuccess ? CommonMessage.Failed : CommonMessage.Success,
      title: !isSuccess
        ? messages.infoMergeIncomplete.defaultMessage
        : messages.infoMergeCompleted.defaultMessage,
      icon: () => (!isSuccess ? <Boxes /> : <Check2Circle />),
    };
  }, [isSuccess]);

  return (
    <GModal
      closeButton={false}
      blurOverlay
      show={open}
      className={'egg-merge-result'}
    >
      <GNotificationModal
        labelConfirm={'I understand'}
        className="egg-merging--modal-status"
        onClose={onCloseHandler}
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

export default EggMergingStatusModal;
