import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IModal } from '@/types/modal';
import { NFTTypeEnum } from '@/types/NFTItem';

export type TypeEggFilterSpec = {
  element: string;
  hatchStatus: string;
  paymentMethod: string;
};

type NFTPaginationResetSpec = {
  resetLimit?: boolean;
};
export interface NFTCollectionsSpec extends IModal {
  deployHash: Array<any>;
  data: Array<any>;
  loaded: boolean;
  viewMode: NFTTypeEnum;
  filters: {
    configs: TypeEggFilterSpec;
    modal: IModal;
  };
  pagination: {
    page: number | null;
    limit: number;
    total: number | null;
    totalItems: number | null;
  };
}

export const DEFAULT_EGG_FILTER_VALUE = 'all';
export const defaultLimitOptions = [20, 50, 100];
export const defaultInitLimit = defaultLimitOptions[0];
export const formInitialFilterValues: TypeEggFilterSpec = {
  element: DEFAULT_EGG_FILTER_VALUE,
  hatchStatus: DEFAULT_EGG_FILTER_VALUE,
  paymentMethod: DEFAULT_EGG_FILTER_VALUE,
};
const defaultPagination = {
  page: 1,
  limit: defaultInitLimit,
  total: null,
  totalItems: null,
};

const initialState: NFTCollectionsSpec = {
  loading: false,
  open: false,
  loaded: false,
  data: [],
  deployHash: [],
  viewMode: NFTTypeEnum.DRAGON,
  filters: {
    configs: formInitialFilterValues,
    modal: {
      loading: false,
      open: false,
    },
  },
  pagination: defaultPagination,
};

const NFTCollectionModal = createSlice({
  name: 'NFTCollectionModal',
  initialState,
  reducers: {
    setLoading: (state: NFTCollectionsSpec, action) => {
      state.loading = action.payload;
    },
    showModal: (state: NFTCollectionsSpec) => {
      state.open = true;
    },
    hideModal: (state: NFTCollectionsSpec) => {
      state.open = false;
    },
    setData: (state: NFTCollectionsSpec, action) => {
      if (!state.loaded) {
        state.loaded = true;
      }

      state.data = action.payload;
    },
    setDeployHash: (state: NFTCollectionsSpec, action) => {
      state.deployHash = action.payload;
    },
    resetData: (state: NFTCollectionsSpec) => {
      state.loaded = false;
      state.data = [];
      state.deployHash = [];
      state.filters.configs = formInitialFilterValues;
    },
    resetFiltersConfigs: (state: NFTCollectionsSpec) => {
      state.filters.configs = formInitialFilterValues;
    },
    setViewMode: (state: NFTCollectionsSpec, action) => {
      state.viewMode = action.payload;
    },
    setFiltersConfigs: (state: NFTCollectionsSpec, action) => {
      state.filters.configs = action.payload;
    },
    setFiltersConfigsModal: (state: NFTCollectionsSpec, action) => {
      state.filters.modal.open = action.payload;
    },
    setLoadedState: (state: NFTCollectionsSpec, action) => {
      state.loaded = action.payload;
    },
    resetPagination: (
      state: NFTCollectionsSpec,
      action: PayloadAction<NFTPaginationResetSpec>,
    ) => {
      if (action.payload.resetLimit) {
        state.pagination = defaultPagination;
      } else {
        state.pagination = {
          ...defaultPagination,
          limit: state.pagination.limit,
        };
      }

      state.data = [];
    },
    increasePageIndex: (
      state: NFTCollectionsSpec,
      // action: PayloadAction<{boolean}>,
    ) => {
      state.pagination.page = (state.pagination.page ?? 0) + 1;
    },
    setPageIndex: (
      state: NFTCollectionsSpec,
      action: PayloadAction<number>,
    ) => {
      state.pagination.page = action.payload;
    },
    setPageLimitPerPage: (
      state: NFTCollectionsSpec,
      action: PayloadAction<number>,
    ) => {
      state.pagination.limit = action.payload;
    },
    setPaginationData: (
      state: NFTCollectionsSpec,
      action: PayloadAction<{
        total: number;
        totalItems: number;
        page: number;
      }>,
    ) => {
      // state.pagination.page = action.payload.page;
      state.pagination.total = action.payload.total;
      state.pagination.totalItems = action.payload.totalItems;
    },
  },
});

const NFTCollectionModalActions = {
  ...NFTCollectionModal.actions,
};
export { NFTCollectionModalActions };

export default NFTCollectionModal.reducer;
