import cn from 'classnames';
import { Check2Circle } from 'react-bootstrap-icons';
import GModal from '@/components/GModal';
import Button from '@/components/GButton';

interface IConfirmModalProps {
  open?: boolean;
  showIcon?: boolean;
  keyboard?: boolean;
  modalClassname?: string;
  children?: React.ReactNode;
  backdrop?: boolean | 'static' | undefined;
  onHide?: () => void;
  onConfirm?: () => void;
  disableConfirm?: boolean;
  disableCancel?: boolean;
}

const ConfirmModal = (props: IConfirmModalProps) => {
  const {
    onHide,
    onConfirm,
    backdrop,
    keyboard = false,
    showIcon = true,
    children,
    open = false,
    modalClassname = '',
    disableConfirm = false,
    disableCancel = false,
  } = props;
  return (
    <GModal
      onHide={onHide}
      backdrop={backdrop}
      keyboard={keyboard}
      closeButton={false}
      show={open}
      className={`compact-modal ${modalClassname}`}
    >
      <div className={cn('compact-modal--box-wrapper')}>
        <div className="compact-modal--box success">
          {showIcon && (
            <div className="header">
              <div className="icon">
                <Check2Circle />
              </div>
            </div>
          )}
          <div className="body">{children}</div>
          <div className="actions">
            <Button
              className="small"
              onClick={onHide}
              btnStyle="3"
              size="small"
              disabled={disableCancel}
            >
              Cancel
            </Button>
            <Button
              className="small"
              disabled={disableConfirm}
              onClick={onConfirm}
              btnStyle="6"
              size="small"
            >
              Confirm
            </Button>
          </div>
        </div>
      </div>
    </GModal>
  );
};

export default ConfirmModal;
