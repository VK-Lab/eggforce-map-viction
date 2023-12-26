import type { TypeVIC, TypeMote } from './balance';

export type TypePurchasePackageParams = {
  totalPackageValue: TypeVIC; // MOTE
  amountEgg: number;
  // buy_for: string;
  // isBuyForChecked: boolean;
  // isInstallmentPayment: boolean;
  // affiliateCode: string;
};

export type TypeBNPLDeployParams = {
  amount: TypeMote;
  paymentAmount: TypeMote;
  count: number;
  plan_len: number;
  contact: string;
};

export enum InstallmentPaymentStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed',
  CANCEL = 'cancel',
}

export type TypePreviewInstallmentPayment = {
  numberOfEggs: number;
  duration: number;
  packageAmount: number;
  providerFee: number;
  downPayment: number;
  paymentAmount: number;
  planPayment: number;
  totalAmount: number;
  rate: number;
  interest: number;
  isBuyable: boolean;
};

export type TypeInstallmentPayment = {
  installmentId: string;
  owner: string;
  at: string;
  rate: number;
  planLength: number;
  planPayment: number;
  token: string;
  tokenIds: string[];
  status: InstallmentPaymentStatus;
  paidAmount: number;
  paidSchedules: number;
  remainingAmount: number;
  remainingSchedules: number;
  nextPaymentSchedule: string;
};

export interface IDetailInstallmentPayment {
  installmentId: number;
  isPayable: boolean;
  owner: string;
  at: string;
  rate: number;
  cancelFeeRate: number;
  planLength: number;
  planPayment: number;
  token: string;
  tokenIds: string[];
  status: string;
  paidAmount: number;
  paidSchedules: number;
  remainingAmount: number;
  remainingSchedules: number;
  nextPaymentSchedule: string;
  nextAmount: number;
  paymentAmount: number;
  interest: number;
}

export type TypePayInstallmentPayment = {
  id: number;
  amount: TypeMote;
  paymentAmount: number;
};

export type TypeRefundInstallmentPayment = {
  id: number;
  paymentAmount: number;
};
