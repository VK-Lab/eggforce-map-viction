import MiddleTruncatedText from '@/components/MiddleTruncatedText';
import BalanceChip from '@/components/BalanceChip';
import { Wallet2 } from 'react-bootstrap-icons';
import useCurrentUser from '@/hooks/useCurrentUser';

const AccountMiniHeader = () => {
  const user = useCurrentUser();
  if (!user) {
    return null;
  }

  return (
    <div className="quickbuy--account-info">
      <div className="quickbuy--account-item wallet">
        <span className="icon">
          <Wallet2 className="icon-wallet" />
        </span>
        <span className="value">
          <MiddleTruncatedText>{user.activeKey}</MiddleTruncatedText>
        </span>
      </div>
      <div className="quickbuy--account-item balance">
        <BalanceChip showBalanceToggler balance={user.balance} />
      </div>
    </div>
  );
};

export default AccountMiniHeader;
