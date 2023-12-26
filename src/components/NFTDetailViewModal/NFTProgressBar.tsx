import { useMemo } from 'react';
import cn from 'classnames';
import isEqual from 'lodash/isEqual';
import { QuestionCircleFill } from 'react-bootstrap-icons';
import useNFTBadgeIcon from '@/hooks/useNFTBadgeIcon';
import { generateCSSElementalClasses } from '@/helpers/nft';
import { selectValidatorsModule } from '@/modules/ValidatorsModule/selectors';
import { useAppSelector as useSelector } from '@/app/hooks';
import { calculateXPAsPercent, nextLevelMap } from '@/modules/NFTDetail/utils';
import { Links } from '@/constants/publicURL';

interface NFTProgressBarSpec {
  data: {
    element: string;
    exp: string;
    nextLevelXp: string;
    level: string;
    validator?: string;
  };
}

const NFTProgressBar = ({ data }: NFTProgressBarSpec) => {
  const { level, element, exp, nextLevelXp, validator } = data;
  const validatorsStore = useSelector(selectValidatorsModule, isEqual);
  const path = useNFTBadgeIcon({ element });
  const percent = useMemo(() => {
    return calculateXPAsPercent({
      exp,
      level,
      nextLevelXp,
    });
  }, [exp, level, nextLevelXp]);
  const validatorData = useMemo(() => {
    const { validators } = validatorsStore;
    if (validator) {
      const result = validators?.find(
        (option) => option.publicKey === validator,
      );
      return result;
    }

    return undefined;
  }, [validator, validatorsStore]);
  const nextLevelName = useMemo(() => {
    const currentLevel = level.toLowerCase();
    const nextLevel = nextLevelMap?.[currentLevel];

    return nextLevel ?? '';
  }, [level]);
  return (
    <div
      className={cn(
        'nft-detail-xp-progress--wrapper',
        generateCSSElementalClasses(element, 'bg'),
      )}
    >
      <div className="progress-body">
        {validatorData ? (
          <img
            className={cn('validator-element')}
            src={validatorData.icon.url}
            alt={validatorData.name}
          />
        ) : path ? (
          <img
            className={cn('image-element', {
              [element]: true,
            })}
            src={path}
            alt={element}
          />
        ) : null}
        <div
          className={cn('value', generateCSSElementalClasses(element))}
          style={{ width: `${percent}%` }}
        ></div>
        {parseInt(nextLevelXp, 10) > 0 && (
          <span className="value-xp">
            {exp} / {nextLevelXp} XP
          </span>
        )}
        <span className="value-next-level">{nextLevelName}</span>
        <span className="value-level-ref">
          <a
            rel="nofollow noopener noreferrer"
            target="_blank"
            href={Links.eggLevelSystem}
            className="link"
          >
            <QuestionCircleFill />
          </a>
        </span>
      </div>
    </div>
  );
};

export default NFTProgressBar;
