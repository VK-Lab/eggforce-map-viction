import { useMemo } from 'react';
import imgSNC from '@/assets/images/icon--snc.png';
import NFTHeaderStatItem from './NFTHeaderEggItem';
// import NFTDragonImage from '@/assets/images/img--nft-benefits.webp';
// import iconEggs from '@/assets/images/TR-08.png';
import { formatXPValue } from '@/modules/NFTDetail/utils';
import useCurrentUser from '@/hooks/useCurrentUser';

const AccountNFTHeader = () => {
  const user = useCurrentUser();
  const { snc } = useMemo(() => {
    return {
      snc: user.totalSnc ?? 0,
      eggsTotal: user.totalEgg! ?? 0,
      dragonsTotal: user.totalDragon! ?? 0,
    };
  }, [user.totalDragon, user.totalEgg, user.totalSnc]);

  return (
    <div className="account-nft-header--root">
      <NFTHeaderStatItem
        tooltipId="tooltip--total-unclaimed-snc"
        tooltipLabel={`Total unclaimed SNC: ${formatXPValue(snc)}`}
        icon={imgSNC}
        value={`${formatXPValue(snc)} SNC`}
        className="snc"
      />
      {/* <NFTHeaderStatItem
        tooltipId="tooltip--total-eggs"
        tooltipLabel="Total minted eggs"
        icon={iconEggs}
        value={eggsTotal}
        className="egg-total"
      />
      <NFTHeaderStatItem
        tooltipId="tooltip--total-dragons"
        tooltipLabel="Total minted dragons"
        icon={NFTDragonImage}
        value={dragonsTotal}
        className="dragon-total"
      /> */}
    </div>
  );
};

export default AccountNFTHeader;
