import type { RootState } from '@/app/store';

const selectValidatorsModule = (state: RootState) => state.validatorsModule;

export { selectValidatorsModule };
