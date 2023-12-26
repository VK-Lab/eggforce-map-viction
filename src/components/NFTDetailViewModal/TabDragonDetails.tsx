import BoxInfo from '@/components/BoxInfo';
import { Heading } from '@/components/Typography';
import type { TraitSpec, DragonTrait } from './DragonAttributes';
import { traitsMapper } from './DragonAttributes';

const TabDragonDetails = ({
  elemental,
  dna,
  rarity,
  edition,
  attributes,
  tokenId,
}: any) => {
  return (
    <div className="nft-detail-hatching--wrapper">
      <div className="egg-hatching-panel--wrapper">
        <div className="egg-hatching-panel--box dragon-boxes">
          <Heading h={4} hasArrow className="fullwidth mb-3">
            Dragon Details
          </Heading>
          <BoxInfo label="Token ID" value={tokenId} isHorizontal={false} />
          <BoxInfo label="Rarity" value={rarity} isHorizontal={false} />
          <BoxInfo
            label="DNA"
            value={dna}
            isHorizontal={false}
            className="box--dna"
          />
          <BoxInfo label="Elemental" value={elemental} isHorizontal={false} />
          <BoxInfo label="Edition" value={edition} isHorizontal={false} />
        </div>
        <div className="egg-hatching-panel--box">
          <Heading h={4} hasArrow className="fullwidth mb-3">
            Dragon Traits
          </Heading>
          {attributes.map((trait: DragonTrait) => (
            <BoxInfo
              key={`box--${trait.trait_type}`}
              label={traitsMapper[trait.trait_type as keyof TraitSpec]}
              value={trait.value}
              isHorizontal={false}
              className={`box--${trait.trait_type}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TabDragonDetails;
