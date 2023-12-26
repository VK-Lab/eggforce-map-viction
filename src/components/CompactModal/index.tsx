import cn from 'classnames';
import { Check2Circle } from 'react-bootstrap-icons';
import GModal from '@/components/GModal';

interface ICompactModalProps {
  onClose?: () => void;
  open?: boolean;
  showIcon?: boolean;
  keyboard?: boolean;
  closeButton?: boolean;
  modalClassname?: string;
  children?: React.ReactNode;
  backdrop?: boolean | 'static' | undefined;
  onHide?: () => void;
}

const CompactModal = (props: ICompactModalProps) => {
  const {
    onHide,
    backdrop,
    keyboard = false,
    showIcon = true,
    children,
    open = false,
    modalClassname,
    closeButton = false,
  } = props;
  return (
    <GModal
      onHide={onHide}
      backdrop={backdrop}
      keyboard={keyboard}
      closeButton={closeButton}
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
        </div>
      </div>
    </GModal>
  );
};

export default CompactModal;
