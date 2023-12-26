import isFunction from 'lodash/isFunction';
import ConnectButton from '@/components/ConnectButton';
import { setLocalStorageItem } from '@/services/localStorage';
import { victionConnector } from '@/services/WalletConnectors';
import type { WalletConnectorType } from '@/services/WalletConnectors';

const ConnectWallet = ({
  onAfterClickConnect,
}: {
  onAfterClickConnect?: (res: unknown) => void;
}) => {
  const onConnect = async (instance: WalletConnectorType) => {
    // Disable logged out state or Set it as `false` on first time using world
    setLocalStorageItem('isManuallyDisconnected', false);

    let connectMessage = instance.connect();
    console.log(`🚀 ~ onConnect ~ connectMessage:`, connectMessage);

    if (onAfterClickConnect && isFunction(onAfterClickConnect)) {
      onAfterClickConnect(connectMessage);
    }
  };

  return (
    <div className="connectors">
      {[victionConnector].map((instance) => (
        <ConnectButton
          key={`connector--${instance.connectorId}`}
          onConnect={() => onConnect(instance)}
          className={`connector connector--${instance.connectorId}`}
          connector={instance}
        />
      ))}
    </div>
  );
};

export default ConnectWallet;
