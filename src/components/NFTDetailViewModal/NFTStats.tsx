import imgHatch from '@/assets/images/icon--unhatch.png';
import imgXP from '@/assets/images/icon--xp.png';
import logoChain from '@/assets/images/logo--viction-white.svg';
import { formatViction } from '@/helpers/balance';

interface NFTStatsSpec {
  data: {
    level: string;
    pointSNC: number;
    pointXP: string;
    stakedAmount: number;
    booster?: {
      rate: number;
    };
  };
}

const NFTStats = ({ data }: NFTStatsSpec) => {
  return (
    <div className="horizontal-attributes--wrapper">
      <div className="each-attribute level">
        <div className="icon">
          <img
            loading="lazy"
            className="img level"
            src={imgHatch}
            alt="Level"
          />
        </div>
        <div className="label">{data.level}</div>
      </div>
      <div className="each-attribute xp">
        <div className="icon">
          <img loading="lazy" className="img xp" src={imgXP} alt="Level" />
        </div>
        <div className="label">{data.pointXP} XP</div>
      </div>
      <div className="each-attribute viction">
        <div className="icon">
          <img
            loading="lazy"
            className="img viction"
            src={logoChain}
            alt="Level"
          />
        </div>
        <div className="label">
          {formatViction(BigInt(data.stakedAmount ?? 0))} VIC
        </div>
      </div>
    </div>
  );
};

export default NFTStats;
