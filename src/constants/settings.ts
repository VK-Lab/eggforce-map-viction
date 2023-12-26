/*
signer : Casper signer
ledger : Ledger device
default: custom adding, view mode
*/
export enum ConnectionTypes {
  viction = 'viction',
  casperDash = 'casperDash',
  casperSigner = 'casperSigner',
  casperWallet = 'casperWallet',
  ledger = 'ledger',
}

export const CONNECTION_TYPES = {
  viction: ConnectionTypes.viction,
};

export const CONNECTED_ACCOUNT_STORAGE_PATH = 'connectedAccount';

const configs = {
  VIC_SC_ADDRESS: '0x915D3CCEDD54e9B1E8666F93F4b8166B41b615C1',
  VIC_SC_VALIDATOR: '0x0000000000000000000000000000000000000088',
  // VIC_VALIDATOR: '0xfFC679Dcdf444D2eEb0491A998E7902B411CcF20',
  DIFF_DURATION_HOURS: 24, // Used for getting rid of too old notifications
  INTERVAL_DEBOUNCE_NFTS_API: 20000,
  INTERVAL_DEBOUNCE_NOTIFICATIONS_API: 15000,
  MIN_MERGE_SNC_BONUS_POINT: 40,
  MAX_MERGE_SNC_BONUS_POINT: 60,
  DEBUG_ENV: Boolean(process.env.REACT_APP_DEBUG_ENV === 'true'),
  VIC_EXPLORER:
    process.env.REACT_APP_VIC_EXPLORER ?? 'https://testnet.tomoscan.io',
  HIDE_EGGFORCE_MAP_CONTROLLERS: Boolean(
    process.env.REACT_APP_HIDE_EGGFORCE_MAP_CONTROLLERS === 'true',
  ),
  TOKEN_SYMBOL: process.env.REACT_APP_TOKEN_SYMBOL ?? 'EGGNFT',
  TOKEN_META:
    process.env.REACT_APP_TOKEN_META ?? 'network test,owner casper-dash',
  BROKER_CONTRACT_NAME:
    process.env.REACT_APP_BROKER_CONTRACT_NAME ?? 'casperdash_eggforce_broker',
  DEALER_KEEPER_CONTRACT_NAME:
    process.env.REACT_APP_DEALER_KEEPER_CONTRACT_NAME ??
    'casperdash_eggforce_dealer_keeper',

  COMMOM_PAYMENT_AMOUNT: process.env.REACT_APP_COMMOM_PAYMENT_AMOUNT
    ? parseFloat(process.env.REACT_APP_COMMOM_PAYMENT_AMOUNT)
    : 10_000_000_000,
  MERGE_PAYMENT_AMOUNT: 10_000_000_000,
  INSTALL_PAYMENT_AMOUNT: process.env.REACT_APP_INSTALL_PAYMENT_AMOUNT
    ? parseFloat(process.env.REACT_APP_INSTALL_PAYMENT_AMOUNT)
    : 300_000_000_000,
  MINT_ONE_PAYMENT_AMOUNT: process.env.REACT_APP_MINT_ONE_PAYMENT_AMOUNT
    ? parseFloat(process.env.REACT_APP_MINT_ONE_PAYMENT_AMOUNT)
    : 20_000_000_000,
  MINT_COPIES_PAYMENT_AMOUNT: process.env.REACT_APP_MINT_COPIES_PAYMENT_AMOUNT
    ? parseFloat(process.env.REACT_APP_MINT_COPIES_PAYMENT_AMOUNT)
    : 100_000_000_000,
  BURN_ONE_PAYMENT_AMOUNT: process.env.REACT_APP_BURN_ONE_PAYMENT_AMOUNT
    ? parseFloat(process.env.REACT_APP_BURN_ONE_PAYMENT_AMOUNT)
    : 12_000_000_000,
  TRANSFER_ONE_PAYMENT_AMOUNT: process.env.REACT_APP_TRANSFER_ONE_PAYMENT_AMOUNT
    ? parseFloat(process.env.REACT_APP_TRANSFER_ONE_PAYMENT_AMOUNT)
    : 2_000_000_000,
  MINIMUM_MINT_QUANTITY: process.env.REACT_APP_MINIMUM_MINT_QUANTITY
    ? parseInt(process.env.REACT_APP_MINIMUM_MINT_QUANTITY, 10)
    : 1,
  MAXMIMUM_MINT_QUANTITY: process.env.REACT_APP_MAXMIMUM_MINT_QUANTITY
    ? parseInt(process.env.REACT_APP_MAXMIMUM_MINT_QUANTITY, 10)
    : 5,
  LEADERBOARD_TOP_HATCHERS: process.env.REACT_APP_LEADERBOARD_TOP_HATCHERS
    ? parseInt(process.env.REACT_APP_LEADERBOARD_TOP_HATCHERS, 10)
    : 1000,
  LEADERBOARD_TOP_EGGS: process.env.REACT_APP_LEADERBOARD_TOP_EGGS
    ? parseInt(process.env.REACT_APP_LEADERBOARD_TOP_EGGS, 10)
    : 1000,
  LEADERBOARD_TOP_VALIDATORS: process.env.REACT_APP_LEADERBOARD_TOP_VALIDATORS
    ? parseInt(process.env.REACT_APP_LEADERBOARD_TOP_VALIDATORS, 10)
    : 1000,
  PUBLIC_WHITELISTED_TIME:
    process.env.REACT_APP_PUBLIC_WHITELISTED_TIME ?? '2023-6-17-15',
  PUBLIC_CLAIM_TIME_END:
    process.env.REACT_APP_PUBLIC_CLAIM_TIME_END ?? '2023-6-22-23',
  HIDE_CUSTOM_PACK:
    Boolean(process.env.REACT_APP_HIDE_CUSTOM_PACK === 'true') ?? false,
};

export default configs;
