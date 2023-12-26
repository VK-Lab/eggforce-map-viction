import useNFTBadgeIcon from '@/hooks/useNFTBadgeIcon';

const NFTBadgeElement = ({ element }: { element: string }) => {
  const path = useNFTBadgeIcon({ element });

  if (!path) {
    return null;
  }
  return (
    <div className={`nft-detail-view--icon-element element--${element}`}>
      <img src={path} alt={element} />
    </div>
  );
};
export default NFTBadgeElement;
