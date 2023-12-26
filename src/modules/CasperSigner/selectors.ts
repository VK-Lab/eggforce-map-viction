import type { RootState } from '@/app/store';

const selectConnectCasperSigner = (state: RootState) => state.casperSigner;

const selectConnectCasperSignerModal = (state: RootState) =>
  state.casperSigner.unconnectedModal;

export { selectConnectCasperSigner, selectConnectCasperSignerModal };
