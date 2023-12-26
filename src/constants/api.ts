import type { PublicKey } from '@/types/generic';
const rootAPI = process.env.REACT_APP_API_END_POINT || 'http://api.localhost';

const KEYCHAIN = {
  me: (publicKey: PublicKey) => `/user/${publicKey}`,
  configuration: `/configurations`,
  fetchPackagesDetail: `/egg/price`,
  fetchNFTSummary: (publicKey: PublicKey) =>
    `/egg/summary?publicKey=${publicKey}`,
  canPlayGame: (publicKey: PublicKey, game: string) =>
    `/minigame/${game}/${publicKey}`,
  playGame: (game: string) => `/minigame/${game}`,
  canMintNFT: (publicKey: PublicKey) => `/user/${publicKey}/canMintNFT`,
  checkStatus: (publicKey: PublicKey) => `/user/${publicKey}/whitelist`,
  loadNFTListing: (publicKey: PublicKey) => `/user/${publicKey}/nfts`,
  mint: `/mintWhitelistNFT`,
  validators: `/validators`,
  deploy: `/deploy`,
  deployStatus: (hash: string) => `/deployStatus?deployHash=${hash}`,
  deployStatuses: (hashes: string) => `/deploysStatus?${hashes}`,
  purchasePackage: `/lead`,
  incubateStart: (tokenId: string) => `/egg/${tokenId}/incubate`,
  incubateStop: (tokenId: string) => `/egg/${tokenId}/stop`,
  claim: (tokenId: string) => `/egg/${tokenId}/claim`,
  merge: (tokenId: string) => `/egg/${tokenId}/merge`,
  makeDragon: (tokenId: string) => `/egg/${tokenId}/drop`,
  detail: (tokenId: string) => `/egg/${tokenId}`,
  dragonDetail: (tokenId: string) => `/dragon/${tokenId}/metadata`,
  encrypt: '/encrypt',
  installment: (query: string) => `/installment?${query}`,
  installmentDetail: (id: string) => `installment/${id}`,
  installmentPreview: (query: string) => `/installment/preview?${query}`,
  statsTopEggs: (query: string) => `/stats/egg?${query}`,
  statsTopIncubators: (query: string) => `/stats/incubator?${query}`,
  statsTopValidators: `/stats/validator`,
  sendAffiliateCode: (publicKey: PublicKey, code: string) =>
    `/codeAffiliate/${publicKey}/?code=${code}`,
  isWhiteListedAccount: (publicKey: string) => `/lead/${publicKey}/wl-winner`,
  registerSNCAirdrop: `/lead`,
  registerLuckyNumber: `/lead`,
};

export { rootAPI };

export default KEYCHAIN;
