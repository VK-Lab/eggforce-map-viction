import { XDiamond, Gem, Activity } from 'react-bootstrap-icons';
import iconDNA from '@/assets/images/icon--dna.svg';
import MiddleTruncatedText from '@/components/MiddleTruncatedText';

interface NFTDragonStatsSpec {
  data: {
    classNFT: string;
    rarity: string;
    bod: string;
    dna: string;
  };
}

const NFTDragonStats = ({ data }: NFTDragonStatsSpec) => {
  return (
    <div className="horizontal-attributes--wrapper">
      <div className="each-attribute elemental">
        <div className="icon">
          <XDiamond className="img inline-block elemental" />
        </div>
        <div className="label">{data.classNFT}</div>
      </div>
      <div className="each-attribute rarity">
        <div className="icon">
          <Gem className="img inline-block rarity" />
        </div>
        <div className="label snc">
          <span className="text-snc">{data.rarity}</span>
        </div>
      </div>
      <div className="each-attribute dob">
        <div className="icon">
          <Activity className="img inline-block dob" />
        </div>
        <div className="label">{data.bod}</div>
      </div>
      <div className="each-attribute dna">
        <div className="icon">
          <img
            className="img inline-block dna"
            src={iconDNA}
            alt="Dragon DNA"
          />
        </div>
        <div className="label">
          <MiddleTruncatedText placement="bottom">
            {data.dna}
          </MiddleTruncatedText>
        </div>
      </div>
    </div>
  );
};

export default NFTDragonStats;
