import { ReactNode } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { generateCSSElementalClasses } from '@/helpers/nft';
import imgUniqueStrengh from '@/assets/images/img--egg-claw.webp';

import imgBg from '@/assets/images/img--bg-unique2.png';
import imgHammer from '@/assets/images/hammer-sample.png';
import useNFTBadgeIcon from '@/hooks/useNFTBadgeIcon';
interface Props {
  children?: ReactNode;
  className?: any;
  blockClassname?: string;
  skipText?: boolean;
  useHammer?: boolean;
  renderMedia?: ReactNode;
  forHatching?: boolean;
  backgroundElement?: string;
  element?: string;
  hasPulseAnimation?: boolean;
  hasElementalBackground?: boolean;
  hasRotateAnimationBg?: boolean;
}

const NFTUniqueStrength = ({
  skipText = false,
  useHammer = false,
  renderMedia = undefined,
  forHatching = false,
  className,
  blockClassname = '',
  backgroundElement = '',
  element = '',
  hasPulseAnimation = true,
  hasRotateAnimationBg = true,
  hasElementalBackground = false,
}: Props) => {
  const imageElement = useNFTBadgeIcon({ isBackground: true, element });

  const data = [
    <span>
      Validator <br />
      Rewards
    </span>,
    <span>
      Double <br />
      Mechanism
    </span>,
    <span>
      Hatching <br />
      Priorities
    </span>,
    <span>Upgradable</span>,
    <span>Labeling</span>,
    <span>
      Exclusive <br />
      Access
    </span>,
  ];
  return (
    <div className={cn(className)}>
      <div
        className={cn('block-unique-strength--root', {
          'no-padding': skipText,
        })}
      >
        <div
          className={cn('block-unique-strength--wrapper', blockClassname, {
            ...generateCSSElementalClasses(backgroundElement, 'bg'),
            'skipping-text': skipText,
            'for--hatching': forHatching,
          })}
        >
          {hasRotateAnimationBg && (
            <img
              src={imgBg}
              alt="EggForce Unique Strength"
              className="block-unique-strength--bg-art"
            />
          )}
          {hasElementalBackground && imageElement && (
            <img
              src={imageElement}
              alt="EggForce Unique Strength"
              className={cn(
                'block-unique-strength--bg-element',
                generateCSSElementalClasses(backgroundElement),
              )}
            />
          )}
          <div className="block-unique-strength--egg-wrapper">
            {renderMedia ? (
              <div
                className={cn('block-unique-strength--egg', {
                  'has-pulse-animation': hasPulseAnimation,
                })}
              >
                {renderMedia}
              </div>
            ) : (
              <img
                className={cn('block-unique-strength--egg', {
                  'has-pulse-animation': hasPulseAnimation,
                })}
                src={useHammer ? imgHammer : imgUniqueStrengh}
                alt="EggForce Unique Strength"
              />
            )}
          </div>

          {!skipText &&
            data.map((word, index) => (
              <div
                key={`word--${index}`}
                className={`unique-strength--item word-${index + 1}`}
              >
                {word}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

NFTUniqueStrength.propTypes = {
  children: PropTypes.node,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default NFTUniqueStrength;
