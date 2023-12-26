import type { RootState } from '@/app/store';

const selectGenericModal = () => (state: RootState) => state.genericModal;

export { selectGenericModal };
