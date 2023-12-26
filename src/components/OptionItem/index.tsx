import cn from 'classnames';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import ProfileBadge from '@/components/ProfileBadge';

interface Props {
  tooltip?: React.ReactElement;
  className?: string;
  thumbClassname?: string;
  text?: string;
  textNode?: React.ReactElement;
  src?: string;
  isVertical?: boolean;
  disabled?: boolean;
  isProfileBadge?: boolean;
}

const OptionItem = (props: Props) => {
  const {
    thumbClassname,
    disabled,
    className,
    text,
    textNode = undefined,
    src,
    isVertical,
    tooltip = undefined,
    isProfileBadge = false,
  } = props;

  const item = (
    <div
      className={cn('option-item--root', className, {
        'is-horizontal': !isVertical,
        'is-vertical': isVertical,
        'is-disabled': disabled,
      })}
    >
      {isProfileBadge ? (
        <ProfileBadge
          className={cn('option-item--thumbnail', thumbClassname, {
            'is-inactive': !src,
            'is-disabled': disabled,
          })}
          primaryImageClassName="for--leaderboard"
        />
      ) : (
        <div
          className={cn('option-item--thumbnail', thumbClassname, {
            'is-inactive': !src,
            'is-disabled': disabled,
          })}
        >
          {src && <img className="img" src={src} alt={text} />}
        </div>
      )}
      <div className="option-item--text">
        <span>{textNode ?? text}</span>
      </div>
    </div>
  );

  if (tooltip) {
    return (
      <OverlayTrigger delay={800} placement="right" overlay={tooltip}>
        {item}
      </OverlayTrigger>
    );
  }

  return item;
};

export default OptionItem;
