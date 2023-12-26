import { useCallback } from 'react';
import cn from 'classnames';
import { useAppDispatch as useDispatch } from '@/app/hooks';
import NFTMedia from './NFTMedia';
import NFTTitle from './NFTTitle';
import LoadingBox from '@/components/LoadingBox';
import type { NFTItem } from '@/types/NFTItem';
import { getNFTDetails } from '@/modules/NFTDetail/utils';
import useNFTBadgeIcon from '@/hooks/useNFTBadgeIcon';
import { getDragonNFTDetail } from '@/modules/NFTDetail/actions';

const NFTDragonCircle = (props: any) => {
  const { element, path } = props;

  return (
    <div
      className={cn('nft-grid-item--circle', {
        [`dragon--${element}`]: true,
      })}
    >
      <img src={path} loading="lazy" alt={path} className={cn('circle-icon')} />
    </div>
  );
};

const GridAsDragon = ({
  data,
  isTooltipContent,
  className = '',
  onClick,
}: any) => {
  const {
    classNFT,
    contractAddress,
    contractName,
    creator,
    description,
    egg,
    image,
    name,
    nftType,
    tokenId,
    origin,
    edition,
  } = getNFTDetails(data as NFTItem);
  const dispatch = useDispatch();
  const path = useNFTBadgeIcon({ element: classNFT?.value });
  const onClickNFTHandler = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      onClick(() =>
        dispatch(
          getDragonNFTDetail({
            editionId: edition?.value,
            originalEggId: origin?.value,
          }),
        ),
      );
    },
    [dispatch, edition?.value, onClick, origin?.value],
  );

  return (
    <div
      className={cn('nft-grid-item--root-2', className, {
        selected: false,
        fullHeight: true,
        'is-tooltip-content': isTooltipContent,
      })}
      onClick={onClickNFTHandler}
    >
      <div className="nft-grid-item--heading">
        <div className="custom-layout">
          <div className="validator-and-progress">
            <NFTDragonCircle element={classNFT?.value} path={path} />
            <NFTTitle
              nftType={nftType}
              contractAddress={contractAddress}
              contractName={contractName}
              name={name}
              tokenId={String(tokenId)}
              creator={creator}
            />
          </div>
        </div>
      </div>
      <NFTMedia
        nftType={nftType}
        media={{
          key: image?.value?.toLowerCase(),
          name: image?.value?.toLowerCase(),
          value: image?.value?.toLowerCase() ?? image,
        }}
        description={description.value}
      />
      <div className="nft-grid-item--body">
        {egg?.isProcessing && (
          <LoadingBox
            className="for--nft-grid-item"
            label="Processing..."
            minHeight={100}
          />
        )}
      </div>
    </div>
  );
};

export default GridAsDragon;
