import BoxInfo from '@/components/BoxInfo';
import { Heading } from '@/components/Typography';
import GValidatorSelect from '@/components/GValidatorSelect';
import type { NFTEggBooster } from '@/types/NFTItem';
import { formateDate } from '@/helpers/datetime';
import { formatViction } from '@/helpers/balance';
const TabHatching = ({
  egg,
  eggId,
  exp = 0,
  nextLevelXp = undefined,
  level = '',
}: any) => {
  const { booster }: { booster: NFTEggBooster } = egg;
  return (
    <div className="nft-detail-hatching--wrapper">
      <div className="egg-hatching-panel--wrapper">
        <div className="egg-hatching-panel--box">
          <Heading h={4} hasArrow className="fullwidth mb-3">
            Incubation details
          </Heading>
          {egg.validator && (
            <div className="fullwidth egg-hatching-panel--validator">
              <GValidatorSelect isDisabled defaultValue={egg.validator} />
            </div>
          )}
          <BoxInfo label="Status" value={egg.status} isHorizontal={false} />
          <BoxInfo
            label="Incubated amount"
            value={`${formatViction(egg?.stakedAmount)} VIC`}
            isHorizontal={false}
          />
          {nextLevelXp && (
            <BoxInfo
              label="Next Level XP"
              value={nextLevelXp}
              isHorizontal={false}
            />
          )}
          <BoxInfo label="Egg Level" value={level} isHorizontal={false} />
        </div>
        {booster && (
          <div className="egg-hatching-panel--box">
            <Heading h={4} hasArrow className="fullwidth mb-3">
              SNC Booster details
            </Heading>
            <BoxInfo
              label="Booster Rate"
              value={`${String(booster.rate * 100)}%`}
              isHorizontal={false}
            />
            <BoxInfo
              label="Boosting NFT ID"
              value={String(eggId)}
              isHorizontal={false}
            />
            <BoxInfo
              label="Remaining Eras"
              value={String(booster.remainingEras)}
              isHorizontal={false}
            />
            {booster.updatedAt && (
              <BoxInfo
                label="Last updated"
                value={formateDate(booster.updatedAt)}
                isHorizontal={false}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TabHatching;
