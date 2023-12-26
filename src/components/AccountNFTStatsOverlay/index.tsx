import { useState, useMemo } from 'react';
import NFTHeaderStatItem from '@/components/AccountINFTHeader/NFTHeaderEggItem';
import { animated, useSpring } from 'react-spring';
import iconEggs from '@/assets/images/TR-08.png';
import iconClose from '@/assets/images/icon--close-button.png';
// eslint-disable-next-line
import useFetchNFTSummary from '@/hooks/useFetchNFTSummary';

const AccountNFTStatsOverlay = () => {
  // const { summary } = useFetchNFTSummary();
  const [isStatVisible, setStatVisible] = useState<boolean>(false);
  const wrapperStyles = useSpring({
    reverse: false,
    to: {
      transform: !isStatVisible
        ? 'translate(100px, -50%)'
        : 'translate(0px, -50%)',
    },
  });
  const { eggs } = useMemo(() => {
    return {
      eggs: {
        Water: 0,
        Fire: 0,
        Wood: 0,
        Earth: 0,
        Metal: 0,
        // Water: summary?.Water ?? 0,
        // Fire: summary?.Fire ?? 0,
        // Wood: summary?.Wood ?? 0,
        // Earth: summary?.Earth ?? 0,
        // Metal: summary?.Metal ?? 0,
      },
    };
  }, []);

  return (
    <animated.div
      style={wrapperStyles}
      className="account-nft-header-stats-overlay--root"
    >
      <button
        className="btn--egg-stats"
        onClick={() => setStatVisible(!isStatVisible)}
      >
        <img
          src={isStatVisible ? iconClose : iconEggs}
          className={isStatVisible ? 'close' : 'egg'}
          alt={isStatVisible ? 'Close' : 'Show egg stats'}
        />
      </button>
      <div className="nft-panel-stats--wrapper">
        <NFTHeaderStatItem
          tooltipId="tooltip--element-water"
          tooltipLabel="Egg Water Element amount"
          icon={'https://assets.eggforce.io/egg/water-rock.png'}
          value={eggs?.Water}
          className="egg"
        />
        <NFTHeaderStatItem
          icon={'https://assets.eggforce.io/egg/fire-rock.png'}
          tooltipLabel="Egg Fire element amount"
          tooltipId="tooltip--element-fire"
          value={eggs?.Fire}
          className="egg"
        />
        <NFTHeaderStatItem
          icon={'https://assets.eggforce.io/egg/wood-rock.png'}
          tooltipLabel="Egg Wood element amount"
          tooltipId="tooltip--element-wood"
          value={eggs?.Wood}
          className="egg"
        />
        <NFTHeaderStatItem
          icon={'https://assets.eggforce.io/egg/earth-rock.png'}
          tooltipLabel="Egg Earth element amount"
          tooltipId="tooltip--element-earth"
          value={eggs?.Earth}
          className="egg"
        />
        <NFTHeaderStatItem
          icon={'https://assets.eggforce.io/egg/metal-rock.png'}
          tooltipLabel="Egg Metal element amount"
          tooltipId="tooltip--element-metal"
          value={eggs?.Metal}
          className="egg"
        />
      </div>
    </animated.div>
  );
};

export default AccountNFTStatsOverlay;
