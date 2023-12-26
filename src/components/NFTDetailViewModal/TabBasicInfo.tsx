import CSPRExplorerButton from '@/components/CSPRExplorerButton';

const TabBasicInfo = ({ data }: any) => {
  const {
    isDragonNFT,
    element = undefined,
    tokenId,
    symbol,
    contractName,
    contractAddress,
    egg,
    dna,
    rarity,
    dob,
    edition,
  } = data;

  return (
    <div className="nft-detail-basic-info--wrapper">
      <div className="metadata-properties is-row">
        <div className="metadata--row">
          <div className="metadata--column left">ID</div>
          <div className="metadata--column right">#{tokenId}</div>
        </div>
        {element && (
          <div className="metadata--row">
            <div className="metadata--column left">Element</div>
            <div className="metadata--column right">{element}</div>
          </div>
        )}
        {egg?.luckyPoint > 0 && (
          <div className="metadata--row">
            <div className="metadata--column left">Lucky Point</div>
            <div className="metadata--column right">
              {egg?.luckyPoint ?? 0}%
            </div>
          </div>
        )}
        <div className="metadata--row">
          <div className="metadata--column left">Symbol</div>
          <div className="metadata--column right">{symbol}</div>
        </div>

        {dna && (
          <div className="metadata--row">
            <div className="metadata--column left">DNA</div>
            <div className="metadata--column right">{dna}</div>
          </div>
        )}

        {rarity && (
          <div className="metadata--row">
            <div className="metadata--column left">Rarity</div>
            <div className="metadata--column right">{rarity}</div>
          </div>
        )}

        {isDragonNFT && dob && (
          <div className="metadata--row">
            <div className="metadata--column left">D.O.B</div>
            <div className="metadata--column right">{dob}</div>
          </div>
        )}

        {edition && (
          <div className="metadata--row">
            <div className="metadata--column left">Edition</div>
            <div className="metadata--column right">{edition}</div>
          </div>
        )}

        <div className="metadata--row">
          <div className="metadata--column left">Contract Name</div>
          <div className="metadata--column right">{contractName}</div>
        </div>
        <div className="metadata--row">
          <div className="metadata--column left">Contract Address</div>
          <div className="metadata--column right">
            <CSPRExplorerButton
              explorerType="contract"
              className="contract-button"
              hash={contractAddress}
              label={false}
              size="small"
              isEmbedded
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabBasicInfo;
