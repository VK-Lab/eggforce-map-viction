import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IModal } from '@/types/modal';

interface DragonManagementModuleSpec {
  dragonMakeStatusModal: IModal & {
    isSuccess: boolean;
  };
  dragonMakeConfirmModal: IModal;
  dragonMakeInstructionModal: IModal;
}

const initialState: DragonManagementModuleSpec = {
  dragonMakeStatusModal: {
    loading: false,
    open: false,
    isSuccess: false,
  },
  dragonMakeConfirmModal: {
    loading: false,
    open: false,
  },
  dragonMakeInstructionModal: {
    loading: false,
    open: false,
  },
};

const DragonManagementModule = createSlice({
  name: 'DragonManagementModule',
  initialState,
  reducers: {
    setMakeStatusLoading: (
      state: DragonManagementModuleSpec,
      action: PayloadAction<boolean>,
    ) => {
      state.dragonMakeStatusModal.loading = action.payload;
    },
    showMakeConfirmModal: (state: DragonManagementModuleSpec) => {
      state.dragonMakeConfirmModal.open = true;
    },
    hideMakeConfirmModal: (state: DragonManagementModuleSpec) => {
      state.dragonMakeConfirmModal.open = false;
    },
    showMakeStatusModal: (state: DragonManagementModuleSpec) => {
      state.dragonMakeStatusModal.open = true;
    },
    hideMakeStatusModal: (state: DragonManagementModuleSpec) => {
      state.dragonMakeStatusModal.open = false;
    },
    setMakeStatusModal: (
      state: DragonManagementModuleSpec,
      action: PayloadAction<boolean>,
    ) => {
      state.dragonMakeStatusModal.isSuccess = action.payload;
    },
    showMakeInstructionModal: (state: DragonManagementModuleSpec) => {
      state.dragonMakeInstructionModal.open = true;
    },
    hideMakeInstructionModal: (state: DragonManagementModuleSpec) => {
      state.dragonMakeInstructionModal.open = false;
    },
  },
});

const dragonManagementActions = {
  ...DragonManagementModule.actions,
};

export { dragonManagementActions };
export default DragonManagementModule.reducer;
