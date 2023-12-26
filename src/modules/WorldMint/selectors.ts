import type { RootState } from '@/app/store';

const selectPackagesDetailStore = (state: RootState) =>
  state.packagesDetailModule;
const selectCutomPackModalStore = (state: RootState) =>
  state.packagesDetailModule.customPackModal;
const selectQuickBuyModalStore = (state: RootState) =>
  state.packagesDetailModule.quickBuyModal;

export {
  selectQuickBuyModalStore,
  selectCutomPackModalStore,
  selectPackagesDetailStore,
};
