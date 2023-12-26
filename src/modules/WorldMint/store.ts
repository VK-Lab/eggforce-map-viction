import { createSlice } from '@reduxjs/toolkit';
import { IModal } from '@/types/modal';

interface IPackagesDetail {
  packages: Array<any>;
  pricePerEgg: number;
  customPackModal: IModal;
  quickBuyModal: IModal;
  salesStats: {
    sold: number;
    total: number;
  };
}

const initialState: IPackagesDetail = {
  packages: [],
  pricePerEgg: 0,
  customPackModal: {
    loading: false,
    open: false,
  },
  quickBuyModal: {
    loading: false,
    open: false,
  },
  salesStats: {
    sold: 0,
    total: 0,
  },
};

const packagesDetailStore = createSlice({
  name: 'PackagesDetailStore',
  initialState,
  reducers: {
    bindData: (state: IPackagesDetail, action) => {
      state.packages = action.payload.packagesMap;
      state.pricePerEgg = action.payload.pricePerEgg;
    },
    updateSalesStats: (state: IPackagesDetail, action) => {
      state.salesStats.sold = action.payload.sold;
      state.salesStats.total = action.payload.total;
    },
    resetData: (state: IPackagesDetail) => {
      state.packages = [];
    },
    showCustomPackModal: (state: IPackagesDetail) => {
      state.customPackModal.open = true;
    },
    hideCustomPackModal: (state: IPackagesDetail) => {
      state.customPackModal.open = false;
    },
    showQuickbuykModal: (state: IPackagesDetail) => {
      state.quickBuyModal.open = true;
    },
    hideQuickbuykModal: (state: IPackagesDetail) => {
      state.quickBuyModal.open = false;
    },
  },
});

const packagesDetailActions = {
  ...packagesDetailStore.actions,
};

export { packagesDetailActions };
export default packagesDetailStore.reducer;
