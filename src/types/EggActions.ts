import type { TokenID } from './generic';
import type { TypeMote } from './balance';
export interface StakeDetailsSpec {
  fromAddress: string;
  validator: string;
  fee: number; // CSPR, must be converted into mote
  amount: number;
  entryPoint: string; // = ENTRY_POINT_DELEGATE
  auctionHash: string; // AUCTION_CONTRACT_HASH
}

export interface ClaimDetailsSpec {
  fromAddress: string;
  toAddress: string;
  fee: number; // CSPR, must be converted into mote
  amount: number;
}

export interface MakeDragonDetailsSpec {
  tokenId: TokenID;
  paymentAmount: TypeMote;
}
