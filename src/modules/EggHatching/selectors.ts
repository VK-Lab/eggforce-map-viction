import type { RootState } from '@/app/store';

const selectEggHatchingModal = (state: RootState) => state.eggHatchingModule;

const selectEggHatchingModalLoading = (state: RootState) =>
  state.eggHatchingModule.loading;

export { selectEggHatchingModalLoading, selectEggHatchingModal };
