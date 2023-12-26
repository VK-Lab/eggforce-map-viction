import { useMemo } from 'react';
import cn from 'classnames';
import Countdown from 'react-countdown';
import useNFTBadgeIcon from '@/hooks/useNFTBadgeIcon';
import configs from '@/constants/settings';
import { calculateXPAsPercent } from '@/modules/NFTDetail/utils';
import imgHatch from '@/assets/images/icon--unhatch.png';

interface ClaimingProgressBarSpec {
  data: {
    element: string;
    sold: string;
    total: string;
    level: string;
  };
}

const ClaimingProgressBar = ({ data }: ClaimingProgressBarSpec) => {
  const { level, element, sold, total } = data;
  const path = useNFTBadgeIcon({ element });
  const percent = useMemo(() => {
    return calculateXPAsPercent({
      exp: sold,
      level,
      nextLevelXp: total,
    });
  }, [sold, level, total]);
  const endClaimTime = useMemo(() => {
    // 11PM 22/7/23 UTC
    const [year, monthFromIndex0, date, hour] =
      configs.PUBLIC_CLAIM_TIME_END.split('-').map((str) => parseInt(str, 10));
    return new Date(Date.UTC(year, monthFromIndex0, date, hour));
  }, []);
  return (
    <div
      className={cn(
        'nft-detail-xp-progress--wrapper claiming',
        // generateCSSElementalClasses(element, 'bg'),
      )}
    >
      <div className="progress-body">
        {path ? (
          <img
            className={cn('image-element', {
              [element]: true,
            })}
            src={imgHatch}
            alt={element}
          />
        ) : null}
        <div
          className={cn('value element--egg')}
          style={{ width: `${percent}%` }}
        ></div>
        {parseInt(total, 10) > 0 && (
          <span className="value-xp">
            {sold} / {total} Eggs
          </span>
        )}
        <span className="value-next-level">
          <span>End Claiming time: </span>
          <Countdown date={endClaimTime} />
        </span>
      </div>
    </div>
  );
};

export default ClaimingProgressBar;
