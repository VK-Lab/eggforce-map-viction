import React from 'react';
import cn from 'classnames';
import { Check2Circle } from 'react-bootstrap-icons';
import Button from '@/components/GButton';

interface IProps {
  children: React.ReactNode;
  icon?: React.ReactElement;
  className?: string;
  closeClassName?: string;
  closeButtonStyle?: string;
  onClose: () => void;
  labelConfirm?: string;
  fullWidth?: boolean;
}

const GNotificationModal = (props: IProps) => {
  const {
    fullWidth = true,
    icon = undefined,
    children,
    onClose,
    className,
    labelConfirm = 'OK',
    closeClassName,
    closeButtonStyle = '1',
  } = props;
  const iconView = icon ? icon : <Check2Circle />;
  return (
    <div className={cn('notification-modal--box-wrapper', className)}>
      <div className="notification-modal--box success">
        <div className="header">
          <div className="icon">{iconView}</div>
        </div>
        <div className="body">
          {children}
          {labelConfirm && (
            <Button
              className={cn('close', closeClassName)}
              fullWidth={fullWidth}
              size="small"
              onClick={onClose}
              btnStyle={closeButtonStyle}
            >
              {labelConfirm}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GNotificationModal;
