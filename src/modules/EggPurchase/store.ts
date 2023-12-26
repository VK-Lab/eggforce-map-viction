import { createSlice } from '@reduxjs/toolkit';
import type { DeployItem } from '@/types/deploy';

export interface IEggPurchase {
  deployHash: DeployItem[];
}

const initialState: IEggPurchase = {
  deployHash: [],
};

const EggPurchase = createSlice({
  name: 'EggPurchaseEgg',
  initialState,
  reducers: {
    addDeploy: (state: IEggPurchase, action) => {
      const MAX_TOTAL = 10;
      if (state.deployHash?.length > MAX_TOTAL) {
        state.deployHash.pop();
      }
      const newDeploy = {
        ...action.payload,
      };
      state.deployHash = [newDeploy, ...state.deployHash];
    },
    reset: (state: IEggPurchase) => {
      state.deployHash = [];
    },
    loadDeployFromCacheData: (state: IEggPurchase, action) => {
      state.deployHash = [...action.payload];
    },
    updateStatus: (state: IEggPurchase, action) => {
      const { hash, status } = action.payload;
      const deploy = state.deployHash.find((item) => item.hash === hash);
      if (deploy) {
        deploy.status = status;
      }
    },
    batchUpdateStatuses: (state: IEggPurchase, action) => {
      const newStatuses = action.payload;
      newStatuses.forEach((obj: any) => {
        const item = state.deployHash.find((item) => item.hash === obj.hash);
        if (item) {
          item.status = obj.status;
        }
      });
    },
  },
});

const EggPurchaseStoreActions = {
  ...EggPurchase.actions,
};

export { EggPurchaseStoreActions };

export default EggPurchase.reducer;
