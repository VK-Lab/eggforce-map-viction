import { useCallback, useEffect } from 'react';
import { ToastContentProps, toast } from 'react-toastify';
import isFunction from 'lodash/isFunction';
import { useConnect } from 'wagmi';
import { victionConnector } from '@/services/WalletConnectors';
import type { WalletConnectorType } from '@/services/WalletConnectors';
import ToastErrorWallet from '@/modules/CasperSigner/ConnectWallet/ToastErrorWallet';

const useInitWalletInstances = () => {
  const renderToastErrorWallet = useCallback(
    (connector: WalletConnectorType, error: any) => {
      console.error(error.message);
      return (props: ToastContentProps) => (
        <ToastErrorWallet
          {...props}
          connector={connector}
          message={error.message}
        />
      );
    },
    [],
  );

  const { connect: connectWithViction } = useConnect({
    connector: victionConnector.instance,
    onError: (error: any) => {
      toast(renderToastErrorWallet(victionConnector, error), {
        toastId: 'error--connect-ledger',
      });
    },
  });

  useEffect(() => {
    const mapper = [
      {
        instance: victionConnector,
        connectFn: connectWithViction,
      },
    ];

    mapper.forEach((item) => {
      const { instance, connectFn } = item;
      if (!isFunction(instance.connectFunction)) {
        instance.setConnector(connectFn);
      }
    });
  }, [connectWithViction]);
};

export default useInitWalletInstances;
