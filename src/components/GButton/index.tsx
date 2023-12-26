import React, { ReactNode } from 'react';
import cn from 'classnames';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { ButtonProps } from '@restart/ui/esm/Button';
interface Props extends ButtonProps {
  children: ReactNode;
  btnStyle?: string;
  size?: string;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  style?: object;
  asLink?: boolean;
  href?: string;
  tooltip?: string;
  fullWidth?: boolean;
  ignoreShadowStyle?: boolean;
}

interface TooltipWrapperProps {
  children: React.ReactElement;
  text: string;
  placement?: any;
}

const TooltipWrapper = (props: TooltipWrapperProps) => {
  const { children, text, placement = 'top' } = props;

  return (
    <OverlayTrigger
      placement={placement}
      overlay={
        <Tooltip
          className="button-tooltip--content"
          id={`tooltip-${placement}`}
        >
          {text}
        </Tooltip>
      }
    >
      {children}
    </OverlayTrigger>
  );
};

const Button = (props: Props) => {
  const {
    style,
    className,
    onClick,
    children,
    btnStyle = '1',
    size = undefined,
    asLink = false,
    href = '',
    tooltip = undefined,
    fullWidth = false,
    disabled = false,
    type = 'button',
    ignoreShadowStyle = false,
  } = props;

  const sharedProps = {
    disabled,
    className: cn(className, {
      'ef-button': true,
      [`btn--style-${btnStyle}`]: true,
      'sz-xsmall': size === 'xsmall',
      'sz-small': size === 'small',
      'sz-xl': size === 'xl',
      'sz-xxl': size === 'xxl',
      'full-width': fullWidth,
      'ignore-shadow-style': ignoreShadowStyle,
    }),
    ...(style && {
      style: {
        ...style,
      },
    }),
  };

  if (asLink) {
    if (tooltip) {
      return (
        <TooltipWrapper text={tooltip}>
          <a
            href={href}
            target="_blank"
            rel="nofollow noopener noreferrer"
            {...sharedProps}
          >
            {children}
          </a>
        </TooltipWrapper>
      );
    }

    return (
      <a
        href={href}
        target="_blank"
        rel="nofollow noopener noreferrer"
        {...sharedProps}
      >
        {children}
      </a>
    );
  }

  if (tooltip) {
    return (
      <TooltipWrapper text={tooltip}>
        <button onClick={onClick} type={type} {...sharedProps}>
          {children}
        </button>
      </TooltipWrapper>
    );
  }

  return (
    <button onClick={onClick} type={type} {...sharedProps}>
      {children}
    </button>
  );
};

export default Button;
