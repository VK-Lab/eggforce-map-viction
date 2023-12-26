import {
  createAsyncThunk,
  configureStore,
  ThunkAction,
  Action,
} from '@reduxjs/toolkit';
import counterReducer from '@/modules/counter/counterSlice';
import authReducer from '@/modules/Auth/store';
import genericModalReducer from '@/modules/GenericErrorModal/store';
import NFTCollectionReducer from '@/modules/EggCollection/store';
import casperSignerReducer from '@/modules/CasperSigner/store';
import eggPurchaseReducer from '@/modules/EggPurchase/store';
import eggHatchingReducer from '@/modules/EggHatching/store';
import eggMergingReducer from '@/modules/EggMerging/store';
import notificationModuleReducer from '@/modules/Notifications/store';
import packagesDetailStoreReducer from '@/modules/WorldMint/store';
import NFTDetailReducer from '@/modules/NFTDetail/store';
import validatorsModuleReducer from '@/modules/ValidatorsModule/store';
import SNCModuleReducer from '@/modules/SNCModule/store';
import DragonManagementModuleReducer from '@/modules/DragonManagementModule/store';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    casperSigner: casperSignerReducer,
    NFTCollection: NFTCollectionReducer,
    NFTDetail: NFTDetailReducer,
    eggPurchase: eggPurchaseReducer,
    genericModal: genericModalReducer,
    notificationModule: notificationModuleReducer,
    packagesDetailModule: packagesDetailStoreReducer,
    eggHatchingModule: eggHatchingReducer,
    eggMergingModule: eggMergingReducer,
    validatorsModule: validatorsModuleReducer,
    // customEventModal: customEventModalReducer,
    SNCModule: SNCModuleReducer,
    dragonManagementModule: DragonManagementModuleReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type GetStateType = typeof store.getState;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

// Require redux-toolkit 1.9
/**
 * Without this, manually we would do this:
 * const actionThunk = createAsyncThunk<
    unknown,
    unknown,
    {
      dispatch: AppDispatch;
    }
  >(``, payloadCreator)
 */
const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
  // rejectValue: string
  // extra: { s: string; n: number }
}>();

export { createAppAsyncThunk as createAsyncThunk };
