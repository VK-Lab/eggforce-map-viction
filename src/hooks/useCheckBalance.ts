import { useCallback } from 'react';
import useCurrentUser from '@/hooks/useCurrentUser';
import type { TypeMote } from '@/types/balance';

const useCheckBalance = () => {
  const user = useCurrentUser();
  const checkBalanceAgainstAmount = useCallback(
    (amount: TypeMote) => {
      if (!user || !user?.balance) {
        return false;
      }
      const bigAmount = BigInt(amount);
      const userBalance = BigInt(user.balance ?? 0);

      if (userBalance === BigInt(0) || bigAmount > userBalance) {
        return false;
      }

      return true;
    },
    [user],
  );

  return {
    checkBalanceAgainstAmount,
  };
};

export default useCheckBalance;
