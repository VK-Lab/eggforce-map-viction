import { useCallback } from 'react';
import cn from 'classnames';
import isFunction from 'lodash/isFunction';
import Button from '@/components/GButton';
import { Links } from '@/constants/publicURL';
import LogoDiscord from '@/assets/images/discord--white.svg';

const SocialDiscordButton = ({
  skipConfused = false,
  compact = false,
  className = '',
  label = 'JOIN DISCORD NOW',
  onClick,
}: any) => {
  const onCLickHandler = useCallback(() => {
    window.open(Links.discord, '_blank');
    if (isFunction(onClick)) {
      onClick();
    }
  }, [onClick]);
  return (
    <Button
      onClick={onCLickHandler}
      className={cn('sharing-button bg--discord', className, {
        'is--compact': compact,
      })}
    >
      <span className="circle discord">
        <img src={LogoDiscord} className="logo" alt="EggForce Social Link" />
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

export default SocialDiscordButton;
