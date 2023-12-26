import type { RootState } from '@/app/store';

const selectDragonManagementModule = (state: RootState) =>
  state.dragonManagementModule;
const selectDragonMakeStatusModal = (state: RootState) =>
  state.dragonManagementModule.dragonMakeStatusModal;
const selectDragonMakeConfirmModal = (state: RootState) =>
  state.dragonManagementModule.dragonMakeConfirmModal;
const selectDragonMakeInstructionModal = (state: RootState) =>
  state.dragonManagementModule.dragonMakeInstructionModal;

export {
  selectDragonMakeStatusModal,
  selectDragonMakeConfirmModal,
  selectDragonManagementModule,
  selectDragonMakeInstructionModal,
};
