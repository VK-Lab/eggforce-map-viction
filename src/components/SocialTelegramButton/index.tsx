import { useCallback } from 'react';
import isFunction from 'lodash/isFunction';
import cn from 'classnames';
import Button from '@/components/GButton';
import { Links } from '@/constants/publicURL';
import LogoTelegram from '@/assets/images/icon--telegram-blue.svg';

const SocialTelegramButton = ({
  skipConfused = false,
  compact = false,
  className = '',
  label = 'JOIN TELEGRAM NOW',
  onClick,
}: any) => {
  const onCLickHandler = useCallback(() => {
    window.open(Links.telegram, '_blank');
    if (isFunction(onClick)) {
      onClick();
    }
  }, [onClick]);
  return (
    <Button
      onClick={onCLickHandler}
      className={cn('sharing-button bg--telegram', className, {
        'is--compact': compact,
      })}
    >
      <span className="circle telegram">
        <img src={LogoTelegram} className="logo" alt="EggForce Social Link" />
      </span>
      <span className="label">
        {!skipConfused && (
          <>
            Confused? <br />
          </>
        )}
        <span className="text-2">{label}</span>
      </span>
    </Button>
  );
};

export default SocialTelegramButton;
