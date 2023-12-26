import { createSlice } from '@reduxjs/toolkit';
import { IModal } from '@/types/modal';
import type { TypeSelectedNFT } from '@/types/NFTItem';
interface IEggHatching extends IModal {
  selectedNFT: TypeSelectedNFT | null;
  selectedValidator?: string;
}

const initialState: IEggHatching = {
  selectedNFT: null,
  selectedValidator: undefined,
  loading: false,
  open: false,
};

const EggHatchingSelectModal = createSlice({
  name: 'EggHatchingSelectModal',
  initialState,
  reducers: {
    setLoading: (state: IEggHatching, action) => {
      state.loading = action.payload;
    },
    showModal: (state: IEggHatching) => {
      state.open = true;
    },
    hideModal: (state: IEggHatching) => {
      state.open = false;
    },
    selectNFT: (state: IEggHatching, action) => {
      state.selectedNFT = action.payload ?? null;
    },
    selectValidator: (state: IEggHatching, action) => {
      state.selectedValidator = action.payload ?? undefined;
    },
    clearValidator: (state: IEggHatching) => {
      state.selectedValidator = undefined;
    },
  },
});
const eggHatchingSelectActions = {
  ...EggHatchingSelectModal.actions,
};

export { eggHatchingSelectActions };
export default EggHatchingSelectModal.reducer;
