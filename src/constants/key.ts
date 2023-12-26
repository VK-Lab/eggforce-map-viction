export const PAYMENT_AMOUNT = 100_000_000_000;
export const MOTE_RATE = 1_000_000_000;
export const VOTE_FEE = 1;
export const CSPR_AUCTION_UNDELEGATE_FEE = 0.00001;
export const REFRESH_TIME = 1 * 60 * 1000;
export const MIN_CSPR_TRANSFER = 2.5;
export const MAX_DELEGATOR_PER_VALIDATOR = 952;
export const KEY_PREFIX = ['account-hash-', 'uref-', 'hash-'];
export const NETWORK_NAME =
  process.env.REACT_APP_NETWORK_NAME || 'viction-test';
export const BASE_API_URL = 'http://localhost:3001';
export const DEPLOY_TTL_MS = 1800000;
export const ENTRY_POINT_DELEGATE = 'delegate';
export const ENTRY_POINT_UNDELEGATE = 'undelegate';
export const EXPLORER_URL =
  NETWORK_NAME === 'viction'
    ? 'https://www.vicscan.xyz'
    : 'https://testnet.vicscan.xyz';
export const TOKEN_SYMBOL = 'VIC';
export const NFT_GATEWAY = 'https://cloudflare-ipfs.com/ipfs/';
export const CASPER_KEY_PATH = `m/44'/506'/0'/0/`;
export const MIN_SNC_INCREMENT_TO_CLAIM = 0;
