import cn from 'classnames';
import Button from '@/components/GButton';
import type { WalletConnectorType } from '@/services/WalletConnectors';

interface IConnectButtonProps {
  connector: WalletConnectorType;
  onConnect: () => void;
  className?: string;
}

const ConnectButton = ({
  onConnect,
  className,
  connector,
}: IConnectButtonProps) => {
  return (
    <Button
      size="small"
      className={cn('btn--connect-wallet', className)}
      onClick={onConnect}
      btnStyle="1"
    >
      <span className="logo">
        <img
          src={connector.iconURL}
          alt={`Wallet ${connector.connectorId}`}
          className={`icon-wallet wallet--${connector.connectorId}`}
        />
      </span>
      {connector.name}
    </Button>
  );
};

export default ConnectButton;
