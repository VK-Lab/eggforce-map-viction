import { useCallback } from 'react';
import { useAppSelector as useSelector } from '@/app/hooks';
import { Heading } from '@/components/Typography';
import Button from '@/components/GButton';
import GModal from '@/components/GModal';
import { selectGenericModal } from '@/modules/GenericErrorModal/selectors';
import { setGenericModalState } from '@/modules/GenericErrorModal/store';
import { useAppDispatch as useDispatch } from '@/app/hooks';
import { getSafeHTML } from '@/helpers/html';
interface IProps {
  onClose?: () => void;
}

const GenericErrorModal = ({ onClose }: IProps) => {
  const dispatch = useDispatch();
  const modalState = useSelector(selectGenericModal());
  const { open, title, body } = modalState;

  const onCloseHandler = useCallback(() => {
    dispatch(setGenericModalState(false));
    onClose && onClose();
  }, [dispatch, onClose]);

  return (
    <GModal
      closeButton={false}
      show={open}
      modalType="notification"
      backdrop="static"
      keyboard={false}
      onHide={onCloseHandler}
      className="generic-modal"
    >
      <Heading h={4} className="mb-3">
        {title}
      </Heading>
      {typeof body === 'string' ? (
        <div
          style={{ marginBottom: 16 }}
          dangerouslySetInnerHTML={getSafeHTML(body)}
        />
      ) : (
        <div style={{ marginBottom: 16 }}>{body}</div>
      )}

      <Button
        className="mb-3"
        style={{ minWidth: 200 }}
        size="small"
        onClick={onCloseHandler}
      >
        OK
      </Button>
    </GModal>
  );
};

export default GenericErrorModal;
