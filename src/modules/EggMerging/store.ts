import { createSlice } from '@reduxjs/toolkit';
import { IModal } from '@/types/modal';

type TypeSelectedNFT = {
  nftType: string;
  tokenId: string;
};

export type TypeMergeStatusModal = IModal & {
  result: boolean;
};

interface EggMergingModuleSpec extends IModal {
  selectedNFT: TypeSelectedNFT | null;
  mergeInstructionModal: IModal;
  mergeStatusModal: TypeMergeStatusModal;
}

const initialState: EggMergingModuleSpec = {
  selectedNFT: null,
  loading: false,
  open: false,
  mergeStatusModal: {
    loading: false,
    open: false,
    result: false,
  },
  mergeInstructionModal: {
    loading: false,
    open: false,
  },
};

const EggMergingModule = createSlice({
  name: 'EggMergingModule',
  initialState,
  reducers: {
    setLoading: (state: EggMergingModuleSpec, action) => {
      state.loading = action.payload;
    },
    showModal: (state: EggMergingModuleSpec) => {
      state.open = true;
    },
    hideModal: (state: EggMergingModuleSpec) => {
      state.open = false;
    },
    selectNFT: (state: EggMergingModuleSpec, action) => {
      state.selectedNFT = action.payload ?? null;
    },
    setMergeStatusLoading: (state: EggMergingModuleSpec, action) => {
      state.mergeStatusModal.loading = action.payload;
    },
    setMergeStatusResult: (state: EggMergingModuleSpec, action) => {
      state.mergeStatusModal.result = action.payload;
    },
    showMergeStatusModal: (state: EggMergingModuleSpec) => {
      state.mergeStatusModal.open = true;
    },
    hideMergeStatusModal: (state: EggMergingModuleSpec) => {
      state.mergeStatusModal.open = false;
    },
    setMergeInstructionLoading: (state: EggMergingModuleSpec, action) => {
      state.mergeInstructionModal.loading = action.payload;
    },
    showMergeInstructionModal: (state: EggMergingModuleSpec) => {
      state.mergeInstructionModal.open = true;
    },
    hideMergeInstructionModal: (state: EggMergingModuleSpec) => {
      state.mergeInstructionModal.open = false;
    },
  },
});
const eggMergingActions = {
  ...EggMergingModule.actions,
};

export { eggMergingActions };
export default EggMergingModule.reducer;
