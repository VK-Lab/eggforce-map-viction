import { useCallback } from 'react';
import cn from 'classnames';
import NFTMedia from './NFTMedia';
import CSPRExplorerButton from '@/components/CSPRExplorerButton';
import NFTTitle from './NFTTitle';
import NFTCreationYear from './NFTCreationYear';
import type { NFTItem } from '@/types/NFTItem';
import { getNFTDetails } from '@/modules/NFTDetail/utils';
import NFTCircle from './NFTCircle';

const GridAsHammer = ({
  data,
  isTooltipContent,
  className = '',
  onClick,
}: any) => {
  const {
    contractAddress,
    creator,
    name,
    contractName,
    yearOfCreation,
    tokenId,
    nftType,
    description,
    image,
    material,
  } = getNFTDetails(data as NFTItem);
  const onClickNFTHandler = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      onClick();
    },
    [onClick],
  );

  return (
    <div
      className={cn('nft-grid-item--root', className, {
        selected: false,
        fullHeight: true,
        'is-tooltip-content': isTooltipContent,
      })}
      onClick={onClickNFTHandler}
    >
      <CSPRExplorerButton
        explorerType="contract"
        className="contract-button"
        hash={contractAddress}
        label={false}
        size="small"
        isEmbedded
      />
      <div className="nft-grid-item--heading">
        <NFTCircle material={material} shouldShowHatchButton={false} />
        <NFTTitle
          nftType={nftType}
          contractAddress={contractAddress}
          contractName={contractName}
          name={name}
          tokenId={String(tokenId)}
          creator={creator}
        />
      </div>
      <NFTMedia
        nftType={nftType}
        media={image}
        description={description.value}
      />
      <div className="nft-grid-item--body">
        <NFTCreationYear yearOfCreation={yearOfCreation} />
        {/* {egg?.isProcessing && <LoadingBox minHeight={100} />} */}
      </div>
    </div>
  );
};

export default GridAsHammer;
