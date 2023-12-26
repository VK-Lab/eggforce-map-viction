import { createSlice } from '@reduxjs/toolkit';
import { IModal } from '@/types/modal';
import type { PayloadAction } from '@reduxjs/toolkit';
interface SNCModuleSpec extends IModal {
  statusModal: IModal & {
    code: string;
    isSuccess: boolean;
    message: string;
  };
}

const initialState: SNCModuleSpec = {
  loading: false,
  open: false,
  statusModal: {
    isSuccess: false,
    loading: false,
    open: false,
    code: '',
    message: '',
  },
};

const SNCModule = createSlice({
  name: 'SNCModule',
  initialState,
  reducers: {
    setLoading: (state: SNCModuleSpec, action) => {
      state.loading = action.payload;
    },
    showModal: (state: SNCModuleSpec) => {
      state.open = true;
    },
    hideModal: (state: SNCModuleSpec) => {
      state.open = false;
    },
    showStatusModal: (state: SNCModuleSpec) => {
      state.statusModal.open = true;
    },
    hideStatusModal: (state: SNCModuleSpec) => {
      state.statusModal.open = false;
    },
    updateRegisterCode: (
      state: SNCModuleSpec,
      action: PayloadAction<string>,
    ) => {
      state.statusModal.code = action.payload;
    },
    updateResultStatusModal: (
      state: SNCModuleSpec,
      action: PayloadAction<boolean>,
    ) => {
      state.statusModal.isSuccess = action.payload;
    },
    updateResultStatusMessage: (
      state: SNCModuleSpec,
      action: PayloadAction<string>,
    ) => {
      state.statusModal.message = action.payload;
    },
  },
});

const SNCModuleActions = {
  ...SNCModule.actions,
};

export { SNCModuleActions };
export default SNCModule.reducer;
