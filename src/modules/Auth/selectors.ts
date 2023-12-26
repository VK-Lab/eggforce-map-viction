import type { RootState } from '@/app/store';

const selectAuth = (state: RootState) => state.auth;
const selectConnectionType = (state: RootState) => state.auth.walletConnected;
const selectAuthPermissions = (state: RootState) => state.auth.permissions;
const selectEggForceSiteConfiguration = (state: RootState) =>
  state.auth.configuration;
export {
  selectEggForceSiteConfiguration,
  selectConnectionType,
  selectAuth,
  selectAuthPermissions,
};
