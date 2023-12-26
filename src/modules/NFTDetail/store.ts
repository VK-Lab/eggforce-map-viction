import { createSlice } from '@reduxjs/toolkit';
import type { IModal } from '@/types/modal';
import type { NFTItem } from '@/types/NFTItem';
export interface INFTDetail extends IModal {
  data?: Partial<NFTItem>;
}

const initialState: INFTDetail = {
  loading: false,
  open: false,
  data: undefined,
};

const NFTDetailModal = createSlice({
  name: 'NFTDetailModal',
  initialState,
  reducers: {
    setLoading: (state: INFTDetail, action) => {
      state.loading = action.payload;
    },
    showModal: (state: INFTDetail) => {
      state.open = true;
    },
    hideModal: (state: INFTDetail) => {
      state.open = false;
    },
    setData: (state: INFTDetail, action) => {
      state.data = action.payload;
    },
    resetData: (state: INFTDetail) => {
      state.data = undefined;
    },
    lockNFT: (state: INFTDetail) => {
      if (state.data !== undefined && state.data.egg) {
        state.data.egg.isProcesssing = true;
      }
    },
  },
});

const NFTDetailModalActions = {
  ...NFTDetailModal.actions,
};
export { NFTDetailModalActions };

export default NFTDetailModal.reducer;
