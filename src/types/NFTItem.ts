import type { TokenID } from './generic';
export type NFTTotalSupply = {
  type: string;
  hex: string;
};

export type NFTMetaData = {
  key: string;
  name: string;
  value: string;
};

export type NFTEggBooster = {
  boostEras: number;
  createdAt: string;
  rate: number;
  remainingEras: number;
  updatedAt: string;
};

export type NFTItem = {
  tokenId: TokenID;
  contractName: string;
  contractAddress: string;
  creator: string;
  metadata: NFTMetaData[];
  action: string;
  ownerAccountHash: string;
  name: string;
  total_supply: NFTTotalSupply;
  symbol: string;
  balances: number;
  egg?: any;
  installmentId: number;
  isInstallment: boolean;
  originalEgg?: {
    uri: string;
    id: string;
  };
};

export enum NFTTypeEnum {
  HAMMER = 'eggforce_hammer_nft',
  EGG = 'eggforce_nft',
  DRAGON = 'eggforce_dragon_nft',
}

export enum NFTEggStatus {
  minting = 'minting',
  minted = 'minted',
  incubating = 'incubating',
  stopped = 'stopped',
  failed = 'failed',
}

export type TypeSelectedNFT = {
  nftType: string;
  tokenId: string;
};
