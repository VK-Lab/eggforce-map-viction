import type { RootState } from '@/app/store';

const selectEggMergingModule = (state: RootState) => state.eggMergingModule;
const selectEggMergingStatusModal = (state: RootState) =>
  state.eggMergingModule.mergeStatusModal;
const selectEggMergingInstructionModal = (state: RootState) =>
  state.eggMergingModule.mergeInstructionModal;

export {
  selectEggMergingInstructionModal,
  selectEggMergingStatusModal,
  selectEggMergingModule,
};
