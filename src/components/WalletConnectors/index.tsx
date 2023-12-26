import { useCallback } from 'react';
import { Wallet2 } from 'react-bootstrap-icons';
import Button from '@/components/GButton';
import { useAppDispatch as useDispatch } from '@/app/hooks';
import useCurrentUser from '@/hooks/useCurrentUser';
import { showConnectCSModal } from '@/modules/CasperSigner/store';

const WalletConnectors = () => {
  const dispatch = useDispatch();
  const user = useCurrentUser();
  const onClickHandler = useCallback(() => {
    if (!user?.activeKey) {
      dispatch(showConnectCSModal());
    }
  }, [dispatch, user]);

  return (
    <div>
      <Button
        className="btn--connect-wallet"
        onClick={onClickHandler}
        role="button"
        size="small"
      >
        <span>
          <Wallet2
            className="icon-wallet"
            style={{ width: 24, marginRight: 8 }}
          />
        </span>
        Connect Wallet
      </Button>
    </div>
  );
};

export default WalletConnectors;
