import { createSlice } from '@reduxjs/toolkit';

interface INotificationModule {
  loading: boolean;
  open: boolean;
}

const initialState: INotificationModule = {
  loading: false,
  open: false,
};

const notificationModuleThunk = createSlice({
  name: 'notificationModule',
  initialState,
  reducers: {
    setLoading: (state: INotificationModule, action) => {
      state.loading = action.payload;
    },
    setOpenState: (state: INotificationModule, action) => {
      state.open = action.payload;
    },
  },
});

const notificationsStoreActions = {
  ...notificationModuleThunk.actions,
};

export { notificationsStoreActions };

export default notificationModuleThunk.reducer;
