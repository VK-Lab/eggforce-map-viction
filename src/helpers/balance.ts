import numeral from 'numeral';
import { BigNumber } from '@ethersproject/bignumber';
import { toCSPR, toMotes } from '@/helpers/currency';
import type { TypeMote } from '@/types/balance';
import { formatEther, parseEther } from 'viem';

/**
 * Convert mote balance from hex to display balance.
 * @param {String} balanceHex - Balance hex.
 * @return {Float} Balance in float.
 */

export const getNumberValueFromHex = (balanceHex: string): TypeMote => {
  try {
    return BigNumber.from(balanceHex).toNumber();
  } catch (err: any) {
    return 0;
  }
};

export const convertBalanceFromHex = (balanceHex: string): TypeMote => {
  return getNumberValueFromHex(balanceHex);
};

/**
 * Given a balance in Mote, return the balance in CSPR
 * @param balance - The balance of the account in Mote.
 * @returns The balance in CSPR.
 */
export const moteToCspr = (balance: number): number => {
  if (balance === undefined || balance === null) {
    return 0;
  }

  const value = toCSPR(balance);
  return value.toNumber();
};

/**
 * Given a balance in CSPR, return the balance in MOTE
 * @param balance - The balance of the account in CSPR.
 * @returns The balance in Mote.
 */
export const csprToMote = (balance: number): TypeMote => {
  if (balance === undefined || balance === null) {
    return 0;
  }

  const value = toMotes(balance);
  return value.toNumber();
};

export const calculateMaximumStakingValue = (
  balance: bigint,
  delegateFee: bigint,
) => {
  try {
    const balanceValue = BigInt(balance);
    const networkFee = BigInt(delegateFee);
    if (balanceValue < networkFee) {
      throw new Error('Invalid param');
    }

    return balanceValue - networkFee;
  } catch (err: any) {
    return BigInt(0);
  }
};

export const formatVIC = (balance: string, formatter = '0,0[.]00[a]') => {
  const balanceBig = BigInt(balance);
  return numeral(formatViction(balanceBig)).format(formatter);
};

export const formatViction = (number: bigint) => formatEther(number);
export const parseViction = (value: string) => parseEther(value);
