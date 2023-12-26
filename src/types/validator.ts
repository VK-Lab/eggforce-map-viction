export type ValidatorCoord = {
  lat: number;
  lng: number;
};

export type ValidatorLogoSize = [number, number];

export type ValidatorLogo = {
  url: string;
  iconSize: ValidatorLogoSize;
};

export type ValidatorType = {
  publicKey: string;
  name: string;
  icon: ValidatorLogo;
  position: ValidatorCoord;
  xpBoost: number;
  delegatorsStaked: number;
  selfStaked: number;
  totalStaked: number;
  fee: number;
  description: string;
  // Belows are optional
  background?: string;
  verified?: boolean;
  shortMeta?: string;
  theme?: string;
  isActiveValidator?: boolean;
  isFull?: boolean;
};

export type ValidatorResponseType = {
  publicKey: string;
  name: string;
  logoUrl: string;
  position: ValidatorCoord;
  xpBoost: number;
  delegatorsStaked: number;
  selfStaked: number;
  totalStaked: number;
  fee: number;
  description: string;
  // Belows are optional
  background?: string; // background url
  verified?: boolean;
  shortMeta?: string;
  theme?: string; // as hex
  isActiveValidator?: boolean;
  isFull?: boolean;
};
