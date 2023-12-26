import { useAccount } from 'wagmi';
import { accountActions } from '@/modules/Auth/store';
import { useAppDispatch } from '@/app/hooks';
import { ConnectionTypes } from '@/constants/settings';

interface useAccountWalletSpec {
  skipOnChange?: boolean;
  skipOnConnect?: boolean;
}

const useAccountWallet = (
  { skipOnConnect, skipOnChange }: useAccountWalletSpec = {
    skipOnConnect: false,
    skipOnChange: false,
  },
) => {
  const dispatch = useAppDispatch();
  const result = useAccount({
    onConnect: ({ address, connector }) => {
      if (skipOnConnect) {
        return;
      }
      if (connector?.id) {
        dispatch(
          accountActions.setWalletConnected(connector?.id as ConnectionTypes),
        );
      }
    },
  });

  // eslint-disable-next-line
  const {
    address: publicKey,
    // isConnected,
    // isConnecting,
    // isReconnecting,
    // status,
  } = result;

  return {
    publicKey,
  };
};

export default useAccountWallet;
