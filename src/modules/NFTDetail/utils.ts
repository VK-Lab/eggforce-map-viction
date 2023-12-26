import numeral from 'numeral';
import type { NFTEggBooster, NFTItem } from '@/types/NFTItem';
import reduce from 'lodash/reduce';
import { formatViction } from '@/helpers/balance';
export const EGG_LEVEL_NAME = {
  ROCK: 'Rock',
  SILVER: 'Silver',
  GOLD: 'Gold',
  PLATINUM: 'Platinum',
};

export const DRAGON_LEVEL_NAME = {
  ELEMENTAL: 'Elemental',
  RARE: 'Rare',
  LEGENDARY: 'Legendary',
  CELESTIAL: 'Celestial',
};

export const ELEMENTAL_NAME = {
  Water: 'Water',
  Fire: 'Fire',
  Wood: 'Wood',
  Metal: 'Metal',
  Earth: 'Earth',
  Wind: 'Wind',
};

export const nextLevelMap: any = {
  rock: EGG_LEVEL_NAME.SILVER,
  silver: EGG_LEVEL_NAME.GOLD,
  gold: EGG_LEVEL_NAME.PLATINUM,
  platinum: EGG_LEVEL_NAME.PLATINUM,
};

export const prevLevelMap: any = {
  [EGG_LEVEL_NAME.ROCK]: EGG_LEVEL_NAME.ROCK,
  [EGG_LEVEL_NAME.SILVER]: EGG_LEVEL_NAME.ROCK,
  [EGG_LEVEL_NAME.GOLD]: EGG_LEVEL_NAME.SILVER,
  [EGG_LEVEL_NAME.PLATINUM]: EGG_LEVEL_NAME.GOLD,
};

export const EGG_MAX_XP_LEVEL = {
  [EGG_LEVEL_NAME.ROCK]: 2 ** 3 * 12 - 12,
  [EGG_LEVEL_NAME.SILVER]: 3 ** 3 * 12 - 12,
  [EGG_LEVEL_NAME.GOLD]: 4 ** 3 * 12 - 12,
  [EGG_LEVEL_NAME.PLATINUM]: 5 ** 3 * 12 - 12,
};

/**
 *
 * Transform data from listing NFTs API to NFT Detail type
 */
export const transformToNFTDetailType = (
  reduxData: any,
  egg: any,
): Partial<NFTItem> => {
  const metadata = egg?.metadata
    ? Object.keys(egg?.metadata).map((key) => ({
        key: key,
        name: key,
        value: egg.metadata[key],
      }))
    : [];

  const result = {
    ...reduxData,
    ...(metadata.length && {
      metadata: [...metadata],
    }),
    egg: {
      luckyPoint: egg?.luck ?? 0,
      booster: (egg?.booster as NFTEggBooster) ?? undefined,
      accumulatedSnc: egg?.accumulatedSnc ?? 0,
      snc: egg?.snc ?? 0,
      status: egg.status,
      stakedAmount: egg.stakedAmount,
      validator: egg.validator,
      isProcessing: egg?.isProcessing ?? false,
      nextLevelXp: egg?.nextLevelXp ?? undefined,
    },
  };

  return result;
};

interface NFTMetadataMapperSpec {
  name?: string;
  description?: string;
  Material?: string;
  image?: string;
  token_uri?: string;
  'Year of creation'?: string;
  Level?: string;
  Class?: string;
  XP?: string;
  XPBoost?: string;
  Brand?: string;
  class?: string;
  dna?: string;
  rarity?: string;
  edition?: string;
  date?: string;
  attributes?: string;
  origin?: string;
}

const NFTMetadataMapper: NFTMetadataMapperSpec = {
  name: 'name',
  description: 'description',
  Material: 'material',
  image: 'image',
  token_uri: 'token_uri',
  'Year of creation': 'yearOfCreation',
  Level: 'level',
  Class: 'classNFT',
  XP: 'xp',
  XPBoost: 'xpBoost',
  Brand: 'brand',
  class: 'classNFT',
  dna: 'dna',
  rarity: 'rarity',
  edition: 'edition',
  date: 'date',
  attributes: 'attributes',
  origin: 'origin',
};

/**
 * Get and return NFT info as variables
 */
export const getNFTDetails = (detail: NFTItem) => {
  const {
    egg,
    contractName,
    contractAddress,
    metadata,
    creator,
    tokenId,
    symbol,
    name: nftType,
    isInstallment = false,
    installmentId = undefined,
  } = detail as NFTItem;

  const defaultMetadata = (
    Object.keys(NFTMetadataMapper) as Array<keyof NFTMetadataMapperSpec>
  ).reduce((out: any, key) => {
    const prop = NFTMetadataMapper[key];
    if (prop) {
      out[prop] = {};
    }

    return out;
  }, {});
  // console.log(`🚀 ~ getNFTDetails ~ metadata:`, metadata);
  const {
    name = {},
    description = {},
    material = {},
    image = {},
    token_uri = {},

    yearOfCreation = {},
    level = {},
    classNFT = {},

    xp = {},
    xpBoost = {},
    brand = {},
    dna = {},
    rarity = {},
    edition = {},
    date = {},
    attributes = {},
    origin = {},
  } = reduce(
    Object.keys(metadata),
    (out: any, item) => {
      const key = item as keyof NFTMetadataMapperSpec;
      out[NFTMetadataMapper[key] as keyof NFTMetadataMapperSpec] =
        {
          key: item,
          //@ts-ignore
          value: metadata[item],
        } ?? {};
      return out;
    },
    defaultMetadata,
  ) ?? defaultMetadata;

  return {
    isInstallment,
    installmentId,
    classNFT,
    contractAddress,
    contractName,
    creator,
    description,
    egg,
    image,
    level,
    material,
    metadata,
    name,
    nftType,
    symbol,
    tokenId,
    token_uri,
    yearOfCreation,
    xp,
    xpBoost,
    brand,
    dna,
    rarity,
    edition,
    date,
    attributes,
    origin,
  };
};

export const formatXPValue = (value: any) =>
  numeral(formatViction(value)).format('0,0.[000]');

export const calculateXPAsPercent = ({ exp, level, nextLevelXp }: any) => {
  if (level === EGG_LEVEL_NAME.PLATINUM) {
    return 100;
  }

  if (!nextLevelXp) {
    return 0;
  }

  if (level !== EGG_LEVEL_NAME.ROCK) {
    // @ts-ignore
    const lastLevelXP = EGG_MAX_XP_LEVEL[prevLevelMap[level]];
    const distance = nextLevelXp - lastLevelXP;
    const diff = exp - lastLevelXP;

    return (diff / distance) * 100;
  }
  return (exp / nextLevelXp) * 100;
};
