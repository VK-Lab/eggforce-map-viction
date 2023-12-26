import { useMemo } from 'react';
import cn from 'classnames';
import configs from '@/constants/settings';
import logoChain from '@/assets/images/logo--viction-white.svg';

interface IProps {
  hash: string;
  label?: boolean;
  className?: string;
  status?: string;
  isEmbedded?: boolean;
  size?: string;
  explorerType?: string;
  extraArgs?: object;
}

const getUrlValue = (type: string, hash: string, opts: any = undefined) => {
  switch (type) {
    case 'contracts':
      // Split `hash-XXXX`
      const valueHash = hash.substring(5);
      return `${type}/${valueHash}/nfts/${opts?.id}`;
    case 'contract':
      // Split `hash-XXXX`
      return `${type}/${hash.substring(5)}`;
    case 'deploy':
    default:
      return `${hash}`;
  }
};

const CSPRExplorerButton = ({
  explorerType = 'deploy',
  size,
  isEmbedded = false,
  className,
  hash,
  label = true,
  status = undefined,
  extraArgs = undefined,
}: IProps) => {
  const deployTransactionUrl = useMemo(() => {
    const url = getUrlValue(explorerType, hash, extraArgs);
    return `${configs.VIC_EXPLORER}/txs/${url}`;
  }, [explorerType, extraArgs, hash]);

  return (
    <a
      href={deployTransactionUrl}
      rel="nofollow noopener noreferrer"
      target="_blank"
      title={`View ${hash} on CSPR explorer`}
      className={cn('btn--view-hash-explorer', className, {
        'is--embedded': isEmbedded,
        'size--small': size === 'small',
      })}
    >
      {status && (
        <span
          className={cn('btn-pulse point-pulse desktop', {
            'is--completed': status === 'completed',
            'is--pending': status === 'pending',
            'is--failed': status === 'failed',
          })}
        ></span>
      )}
      <span className="icon">
        <img
          src={logoChain}
          alt={'View on Viction Explorer'}
          className="icon-wallet"
        />
      </span>
      {label && <>CSPR Explorer</>}
    </a>
  );
};

export default CSPRExplorerButton;
