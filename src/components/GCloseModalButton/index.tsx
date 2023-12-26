import cn from 'classnames';
import iconClose from '@/assets/images/icon--close-button.png';

const CloseModalButton = ({ onClick, className, disabled = false }: any) => (
  <button
    disabled={disabled}
    className={cn('btn--close-modal', className)}
    onClick={onClick}
  >
    <img src={iconClose} alt="Close" />
  </button>
);

export default CloseModalButton;
