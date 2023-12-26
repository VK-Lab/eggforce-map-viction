import type { RootState } from '@/app/store';

const selectEggPurchaseStore = (state: RootState) => state.eggPurchase;

export { selectEggPurchaseStore };
