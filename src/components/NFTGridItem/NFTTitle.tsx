import { useMemo } from 'react';
import type { TokenID } from '@/types/generic';
import type { NFTMetaData } from '@/types/NFTItem';
import { NFTTypeEnum } from '@/types/NFTItem';
import StatusLabel from '@/components/StatusLabel';

interface NFTTitleSpec {
  nftType: string;
  contractAddress: string;
  contractName: string;
  creator?: string;
  tokenId: TokenID;
  name: NFTMetaData;
  isDetailView?: boolean;
  status?: string;
  booster?: {
    rate: number;
  };
}

const NFTTitle = ({
  name,
  tokenId,
  contractName,
  nftType,
  isDetailView = false,
  status = '',
  booster = undefined,
}: NFTTitleSpec) => {
  const finalName = useMemo(() => {
    return (
      (nftType === NFTTypeEnum.EGG
        ? `${contractName} #${tokenId}`
        : name.value) ?? ''
    );
  }, [contractName, name.value, nftType, tokenId]);

  const cssPrefix = isDetailView ? 'nft-detail-view' : 'nft-metadata';

  return (
    <div className="name">
      <div className={`${cssPrefix}--name`}>{finalName}</div>
      <div className={`${cssPrefix}--creator`}>
        {/* <MiddleTruncatedText>{subTitle}</MiddleTruncatedText> */}
        {status !== '' && (
          <StatusLabel value={status} booster={booster?.rate} />
        )}
      </div>
    </div>
  );
};

export default NFTTitle;
