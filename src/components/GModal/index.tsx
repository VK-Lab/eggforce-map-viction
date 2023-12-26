import { ReactNode } from 'react';
import cn from 'classnames';
import Modal, { ModalProps } from 'react-bootstrap/Modal';
import CloseModalButton from '@/components/GCloseModalButton';
import Decor from '@/components/GDecor';
interface Props extends ModalProps {
  children: ReactNode;
  title?: ReactNode | string;
  modalType?: string | undefined;
  blurOverlay?: boolean;
  hasDecor?: boolean;
  disabledClose?: boolean;
}

const GModal = (props: Props) => {
  const {
    dialogClassName,
    onHide,
    show,
    backdrop,
    keyboard,
    className,
    children,
    modalType = undefined,
    size = 'lg',
    title,
    closeButton = true,
    blurOverlay = false,
    hasDecor = true,
    disabledClose = false,
  } = props;
  return (
    <Modal
      dialogClassName={dialogClassName}
      backdrop={backdrop}
      keyboard={keyboard}
      onHide={onHide}
      show={show}
      size={size}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={cn(
        'gmodal--root',
        {
          'is-blur-overlay': blurOverlay,
          notification: modalType === 'notification',
        },
        className,
      )}
    >
      {closeButton && (
        <CloseModalButton disabled={disabledClose} onClick={onHide} />
      )}
      <Modal.Header closeButton={undefined}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {hasDecor && <Decor.Top />}
        {children}
        {hasDecor && <Decor.Bottom />}
      </Modal.Body>
    </Modal>
  );
};

export default GModal;
