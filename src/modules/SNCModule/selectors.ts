import type { RootState } from '@/app/store';

const selectSNCModule = (state: RootState) => state.SNCModule;

export { selectSNCModule };
