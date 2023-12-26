import cn from 'classnames';
import profileAvatar from '@/assets/images/icon--thetree-with-bg.webp';

interface ProfileBadgeSpec {
  className: string;
  primaryImageClassName?: string;
  imageElement?: string | null;
  disableBadge?: boolean;
}

const ProfileBadge = (props: ProfileBadgeSpec) => {
  const {
    disableBadge = true,
    imageElement = '',
    className = '',
    primaryImageClassName = '',
  } = props;
  return (
    <div className={cn('profile-badge--wrapper', className)}>
      {!disableBadge && imageElement && (
        <img
          src={imageElement}
          alt="EggForce Unique Strength"
          className={cn(
            'block-unique-strength--bg-element',
            // generateCSSElementalClasses(backgroundElement),
          )}
        />
      )}
      <img
        src={profileAvatar}
        alt="Profile avatar"
        className={cn('profile-badge--primary-image', primaryImageClassName)}
      />
    </div>
  );
};

export default ProfileBadge;
