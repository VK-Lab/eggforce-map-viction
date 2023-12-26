import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { axios } from '@/services/axios';
import API from '@/constants/api';
import isBoolean from 'lodash/isBoolean';
import {
  EggForceConfigurationEnum,
  EggForceConfigurationSpec,
} from '@/types/generic';
import {
  setLocalStorageItem,
  clearLocalStorage,
} from '@/services/localStorage';
import { AppDispatch } from '@/app/store';
import {
  validateHasHammerAccount,
  validateAccount,
  getUserProfile,
} from '@/modules/Account/actions';

import {
  updateAccountPermissions,
  accountActions,
  updateAccountBalance,
  disconnectAccount,
  bindAccount,
  setConnectedState,
} from './store';
import type { UserType } from './store';
import { AxiosResponse } from 'axios';

// initAccount by createAsyncThunk
// This requires `unwrap` call after
const initAccountThunk = createAsyncThunk(
  `auth/initializeAccount`,
  (key: string, { dispatch }) => {
    console.log('>>>> Bind key: ', key);
    dispatch(setConnectedState());
    dispatch(
      bindAccount({
        activeKey: key,
        isConnected: true,
        isUnlocked: true,
      }),
    );
  },
);

const unlockMetamaskSigner = createAsyncThunk(
  'auth/unlockMetamaskSigner',
  async (
    { data, eventType }: { data: UserType; eventType: string },
    { dispatch },
  ) => {
    dispatch(initAccountThunk(data.activeKey));

    // Add toastId to prevent duplicated toast
    toast.success(`Successfully connected`, {
      toastId: eventType,
    });

    // Load more account info and dispatch into store
    //. E.g: balance
    await dispatch(reloadCurrentUser(data.activeKey));
    return data;
  },
);

const disconnectCasperSigner = createAsyncThunk(
  'auth/disconnectCasperSigner',
  async (_, { dispatch }) => {
    clearLocalStorage('activeKey');
    setLocalStorageItem('isManuallyDisconnected', true);
    dispatch(disconnectAccount());
    return true;
  },
);

const reloadCurrentUser = createAsyncThunk(
  'auth/reloadCurrentUser',
  async (publicKey: string, { dispatch }) => {
    const accountInfo = await dispatch(getUserProfile(publicKey)).unwrap();
    console.log(`🚀 ~ accountInfo:`, accountInfo);
    dispatch(
      updateAccountBalance({
        balance: accountInfo.balance,
        totalEgg: accountInfo.totalEgg,
        totalSnc: accountInfo.totalSnc,
        totalDragon: accountInfo.totalDragon,
      }),
    );
  },
);

const reloadUserPermissions = createAsyncThunk<
  unknown,
  unknown,
  {
    dispatch: AppDispatch;
  }
>('auth/reloadUserPermissions', async (_, { dispatch }) => {
  dispatch(accountActions.setLoading(true));
  const result: unknown = await dispatch(validateAccount());
  if (isBoolean(result)) {
    dispatch(
      updateAccountPermissions({
        key: 'canMint',
        value: result,
      }),
    );
  }

  dispatch(accountActions.setLoading(false));
  // Check whether Account has hammer NFT or not
  const hammerResult = await dispatch(validateHasHammerAccount()).unwrap();
  if (isBoolean(hammerResult)) {
    dispatch(
      updateAccountPermissions({
        key: 'hasHammer',
        value: hammerResult,
      }),
    );
  }

  return result;
});

const isReadyForDeployment = async (
  getState: any,
  params?: Array<EggForceConfigurationEnum>,
) => {
  return true;
};

const getEggforceConfiguration = createAsyncThunk(
  'auth/getEggforceConfiguration',
  async (_, { signal, dispatch }) => {
    const result: AxiosResponse = await axios.get(API.configuration, {
      signal,
    });
    if (result.status === 200) {
      dispatch(
        accountActions.updateEggForceSiteConfiguration(
          result.data as EggForceConfigurationSpec,
        ),
      );
    }
  },
);

export {
  getEggforceConfiguration,
  isReadyForDeployment,
  reloadUserPermissions,
  disconnectCasperSigner,
  unlockMetamaskSigner,
  reloadCurrentUser,
};
