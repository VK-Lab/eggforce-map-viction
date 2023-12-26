import React, { useMemo, useState } from 'react';
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import cn from 'classnames';
import logoChain from '@/assets/images/logo--viction-white.svg';
import { formatVIC } from '@/helpers/balance';
interface IBalanceChip {
  balance?: number | string;
  showBalanceToggler?: boolean;
  style?: React.CSSProperties;
  forceShowBalance?: boolean;
}

const BalanceChip = ({
  balance,
  showBalanceToggler = false,
  forceShowBalance = false,
  style,
}: IBalanceChip) => {
  const [isBalanceVisible, setBalanceVisible] =
    useState<boolean>(forceShowBalance);
  const balanceBig = balance ? BigInt(balance) : BigInt(0);
  const value = useMemo(() => {
    if (
      isBalanceVisible &&
      typeof balance === 'string' &&
      (showBalanceToggler || forceShowBalance)
    ) {
      const value = formatVIC(balanceBig.toString());
      return `${value ?? 0} VIC`;
    }

    return `*`.repeat(10);
  }, [
    balance,
    balanceBig,
    forceShowBalance,
    isBalanceVisible,
    showBalanceToggler,
  ]);

  return (
    <div className="chip--balance" style={style}>
      <span className="icon">
        <img src={logoChain} alt="Account Balance" />
      </span>
      <span
        className={cn('value', {
          'is-hidden':
            !forceShowBalance && (!showBalanceToggler || !isBalanceVisible),
        })}
      >
        {value}
      </span>
      {showBalanceToggler && (
        <button
          className="toggler btn--balance-toggler"
          onClick={() => setBalanceVisible((prevState) => !prevState)}
        >
          {isBalanceVisible ? <Eye /> : <EyeSlash />}
        </button>
      )}
    </div>
  );
};

export default BalanceChip;
