import { useCallback, useEffect } from 'react';
import { useAppDispatch as useDispatch } from '@/app/hooks';
import { unlockMetamaskSigner } from '@/modules/Auth/actions';
import { isValidPublicKey } from '@/modules/CasperSigner/helpers';
import useAccountWallet from './useAccountWallet';

const useWalletConnector = () => {
  const { publicKey } = useAccountWallet();
  const dispatch = useDispatch();

  const onWalletConnected = useCallback(
    async (publicKey: string) => {
      // eslint-disable-next-line
      const result = await dispatch(
        unlockMetamaskSigner({
          data: {
            activeKey: publicKey,
          },
          eventType: 'useWallet',
        }),
      ).unwrap();
    },
    [dispatch],
  );

  useEffect(() => {
    if (!publicKey) {
      return;
    }

    if (isValidPublicKey(publicKey)) {
      onWalletConnected(publicKey);
    }
  }, [dispatch, onWalletConnected, publicKey]);
};

export default useWalletConnector;
