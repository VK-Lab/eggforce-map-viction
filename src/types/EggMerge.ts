export const ItemTypes = {
  EGG: 'egg',
};

export type DroppedItemSpec = {
  tokenId: string;
  classNFT: string;
  isInstallment: boolean;
};

export interface EggPlaceholderState {
  accepts: string[];
  lastDroppedItem: DroppedItemSpec | null;
  slot: number;
}

export interface BoxState {
  name: string;
  type: string;
}
