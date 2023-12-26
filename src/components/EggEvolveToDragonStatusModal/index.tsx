import { useMemo, useCallback } from 'react';
import GModal from '@/components/GModal';
import { Check2Circle, Boxes, InfoCircle } from 'react-bootstrap-icons';
import GNotificationModal from '@/components/GNotificationModal';
import { Heading } from '@/components/Typography';
import { selectDragonMakeStatusModal } from '@/modules/DragonManagementModule/selectors';
import { dragonManagementActions } from '@/modules/DragonManagementModule/store';
import {
  useAppDispatch as useDispatch,
  useAppSelector as useSelector,
} from '@/app/hooks';
import CommonMessage from '@/components/CommonMessages';
import messages from '@/modules/DragonManagementModule/mesages';

const EggEvolveToDragonStatusModal = ({ onClose }: { onClose: () => void }) => {
  const dispatch = useDispatch();
  const { open, isSuccess } = useSelector(selectDragonMakeStatusModal);
  const onCloseHandler = useCallback(() => {
    dispatch(dragonManagementActions.hideMakeStatusModal());
    dispatch(dragonManagementActions.hideMakeConfirmModal());
    onClose();
  }, [dispatch, onClose]);
  const { title, icon, msg } = useMemo(() => {
    return {
      msg: !isSuccess ? CommonMessage.Failed : CommonMessage.Success,
      title: !isSuccess
        ? messages.infoMakeDragonIncomplete.defaultMessage
        : messages.infoMakeDragonCompleted.defaultMessage,
      icon: () => (!isSuccess ? <Boxes /> : <Check2Circle />),
    };
  }, [isSuccess]);

  return (
    <GModal
      closeButton={false}
      blurOverlay
      show={open}
      className={'egg-evolution-result'}
    >
      <GNotificationModal
        labelConfirm={'I understand'}
        className="egg-evolution--modal-status"
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

export default EggEvolveToDragonStatusModal;
