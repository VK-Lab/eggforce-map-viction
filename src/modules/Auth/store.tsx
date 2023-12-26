import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ConnectionTypes } from '@/constants/settings';
import { EggForceConfigurationSpec } from '@/types/generic';

type Balance = string;

export type UserType = {
  activeKey: string;
  isConnected?: boolean;
  isUnlocked?: boolean;
  maxEggRemaining?: number;
  balance?: Balance;
  totalEgg?: number;
  totalSnc?: number;
  totalDragon?: number;
  pendingSnc?: number;
};

type UserPermissions = {
  canMint?: boolean;
  hasHammer?: boolean;
  isWhitelistAccount?: boolean;
};

export interface IAuthState {
  isConnected: boolean;
  currentUser: UserType | undefined;
  lastUpdatedDate: string;
  walletConnected: ConnectionTypes | undefined;
  permissions: UserPermissions | undefined;
  loading: boolean;
  affiliateCode?: string;
  configuration: Partial<EggForceConfigurationSpec>;
}

const initialState: IAuthState = {
  loading: false,
  isConnected: false,
  currentUser: undefined,
  lastUpdatedDate: '',
  walletConnected: undefined,
  permissions: {
    canMint: false,
    hasHammer: false,
    isWhitelistAccount: false,
  },
  affiliateCode: '',
  configuration: {},
};

const authThunk = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state: IAuthState, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setConnectedState: (state: IAuthState) => {
      state.isConnected = true;
    },
    disconnectAccount: (state: IAuthState) => {
      state.isConnected = false;
      state.currentUser = undefined;
      state.lastUpdatedDate = new Date().toString();
    },
    bindAccount: (state: IAuthState, action: PayloadAction<UserType>) => {
      state.currentUser = {
        ...state.currentUser,
        ...action.payload,
      };
    },
    setWalletConnected: (
      state: IAuthState,
      action: PayloadAction<ConnectionTypes>,
    ) => {
      state.walletConnected = action.payload;
    },
    updateAccountEggRemaining: (
      state: IAuthState,
      action: PayloadAction<number>,
    ) => {
      if (!state.currentUser || action?.payload === undefined) {
        return;
      }

      state.currentUser.maxEggRemaining = action.payload;
    },
    updateAccountBalance: (
      state: IAuthState,
      action: PayloadAction<{
        balance: Balance;
        totalEgg: number;
        totalSnc: number;
        totalDragon: number;
      }>,
    ) => {
      if (
        !state.currentUser ||
        (action.payload?.balance !== '0' && !action.payload)
      ) {
        return;
      }

      state.currentUser = {
        ...state.currentUser,
        ...action.payload,
      };
    },
    updateAccountAffiliateCode: (
      state: IAuthState,
      action: PayloadAction<string>,
    ) => {
      state.affiliateCode = action.payload;
    },
    updateAccountPermissions: (
      state: IAuthState,
      action: PayloadAction<{ key: string; value: boolean }>,
    ) => {
      if (!state.currentUser || !action.payload) {
        return;
      }

      state.permissions = {
        ...state.permissions,
        [action.payload.key]: action.payload.value,
      };
    },
    updateEggForceSiteConfiguration: (
      state: IAuthState,
      action: PayloadAction<EggForceConfigurationSpec>,
    ) => {
      state.configuration = action.payload;
    },
  },
});

export const accountActions = {
  ...authThunk.actions,
};

export const {
  updateAccountPermissions,
  updateAccountBalance,
  setConnectedState,
  disconnectAccount,
  bindAccount,
} = authThunk.actions;

export default authThunk.reducer;
