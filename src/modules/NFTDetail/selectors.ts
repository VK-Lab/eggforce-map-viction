import type { RootState } from '@/app/store';

const selectNFTDetailModal = (state: RootState) => state.NFTDetail;
const selectNFTDetails = () => (state: RootState) => state.NFTDetail.data;
const selectNFTDetailsOpen = () => (state: RootState) => state.NFTDetail.open;

export { selectNFTDetailModal, selectNFTDetailsOpen, selectNFTDetails };
