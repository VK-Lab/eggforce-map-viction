import type { RootState } from '@/app/store';

const selectNotificationModule = () => (state: RootState) => state.notificationModule;

export { selectNotificationModule };
