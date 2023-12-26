import cn from 'classnames';
import { TwitterIcon, TwitterShareButton } from 'react-share';
import isFunction from 'lodash/isFunction';
import Button from '@/components/GButton';
import { Links } from '@/constants/publicURL';
import LogoDiscord from '@/assets/images/discord.svg';

type TypeTwitterProps = {
  url: string;
  title?: string;
  via?: string;
  hashtags?: string[];
  label?: string;
  onShareWindowClose?: () => void;
  customBackgroundClass?: string;
};

interface ISocialSharingProps {
  parentClassnames?: string;
  size?: string;
  twitterProps?: TypeTwitterProps;
  hideDiscord?: boolean;
}

const SocialSharingBlock = (props: ISocialSharingProps) => {
  const {
    parentClassnames,
    hideDiscord = false,
    twitterProps = {
      url: '',
      title: '',
      via: '',
      hashtags: [],
      label: 'Share',
      onShareWindowClose: undefined,
      customBackgroundClass: 'use--selvyn-bg',
    },
  } = props;

  const {
    url = 'https://eggforce.io',
    title,
    via,
    hashtags,
    label = 'Share Twitter',
    onShareWindowClose,
    customBackgroundClass,
  } = twitterProps;

  return (
    <div className={cn('sharing-blocks--wrapper', parentClassnames)}>
      <TwitterShareButton
        className={cn('tw sharing-button', customBackgroundClass)}
        title={title}
        via={via}
        hashtags={hashtags}
        url={url}
        {...(onShareWindowClose &&
          isFunction(onShareWindowClose) && {
            onShareWindowClose,
          })}
      >
        <TwitterIcon size={46} round={true} />
        <span className="label">{label}</span>
      </TwitterShareButton>
      {!hideDiscord && (
        <Button
          asLink
          href={Links.discord}
          ignoreShadowStyle
          className="sharing-button"
        >
          <span className="circle discord">
            <img src={LogoDiscord} alt="EggForce Social Link" />
          </span>
          <span className="label">Join Discord</span>
        </Button>
      )}
    </div>
  );
};

export default SocialSharingBlock;
