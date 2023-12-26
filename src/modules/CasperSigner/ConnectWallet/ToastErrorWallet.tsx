import { useMemo } from 'react';
import { ToastContentProps } from 'react-toastify';
import { Links } from '@/constants/publicURL';
import type { WalletConnectorType } from '@/services/WalletConnectors';

interface IToastErrorCustom extends ToastContentProps {
  connector: WalletConnectorType;
  message: string;
}

const ToastErrorWallet = (props: IToastErrorCustom) => {
  const { connector } = props;
  const sharedProps = {
    target: '_blank',
    rel: 'nofollow noopener noreferrer',
    style: { color: '#FFB356' },
  };
  const { walletName, url } = useMemo(() => {
    return {
      walletName: connector.name,
      url: connector.walletLink,
    };
  }, [connector.name, connector.walletLink]);

  return (
    <div>
      <span>
        Could not find {walletName} extension installed. Make sure you{' '}
        <a {...sharedProps} href={url}>
          have {walletName} installed
        </a>{' '}
        and refresh the page before trying again. Or{' '}
        <a {...sharedProps} href={Links.discord}>
          join our community
        </a>{' '}
        for further help.
      </span>
    </div>
  );
};

export default ToastErrorWallet;
