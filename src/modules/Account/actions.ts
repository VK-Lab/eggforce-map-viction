import { createAsyncThunk } from '@reduxjs/toolkit';
import qs from 'qs';
import { AppDispatch, RootState, AppThunk } from '@/app/store';
import { axios } from '@/services/axios';
import { IAuthState } from '@/modules/Auth/store';
import API from '@/constants/api';
import { signal } from '@/services/axios';
import { NFTTypeEnum } from '@/types/NFTItem';
import { isReadyForDeployment } from '@/modules/Auth/actions';
import type { UserType } from '@/modules/Auth/store';

import type { Address } from 'viem';
import { publicClient } from '@/services/chains';

export type ClaimWhitelistResponse = {
  deployHash?: string;
  status?: string;
};

const claimWhiteListAccount =
  (signed: string): AppThunk =>
  async (dispatch, getState) => {
    try {
      const state: { auth: IAuthState } = getState();
      const {
        auth: { currentUser },
      } = state;

      if (!currentUser?.activeKey) {
        return;
      }

      const { activeKey } = currentUser;
      const result = await axios.post(API.mint, {
        signature: signed,
        publicKey: activeKey,
      });

      return result.data;
    } catch (error) {
      console.log(`🚀 ~ claimWhiteListAccount ~ error`, error);
      return undefined;
    }
  };

const isWhitelistedAccount = createAsyncThunk(
  'user/isWhitelistedAccount',
  async (publicKey: string) => {
    const { data } = await axios.get(API.isWhiteListedAccount(publicKey), {
      signal,
    });

    if (!data) {
      return false;
    }

    return Boolean(data.status === 'success' && data.isWLWinner);
  },
);

const validateWhitelistAccount = createAsyncThunk(
  'user/validateWhitelistAccount',
  async (publicKey: string) => {
    const { data } = await axios.get(API.checkStatus(publicKey), {
      signal,
    });

    if (!data) {
      return;
    }

    return data;
  },
);

const getUserProfile = createAsyncThunk(
  'user/getUserProfile',
  async (publicKey: string) => {
    const { data } = await axios.get(API.me(publicKey), {
      signal,
    });

    // @ts-ignore
    const dataWallet_Viction = await publicClient.getBalance({
      address: publicKey as Address,
    });

    if (!data) {
      return {
        balance: '0',
        totalEgg: 0,
        totalSnc: 0,
        totalDragon: 0,
      };
    }

    return {
      balance: dataWallet_Viction.toString(), //convertBalanceFromHex(data.balance?.hex ?? '0'),
      totalEgg: data?.totalEgg ?? 0,
      totalSnc: data?.totalSnc ?? 0,
      totalDragon: data?.totalDragon ?? 0,
    };
  },
);

const validateAccount = (): AppThunk => async (dispatch, getState) => {
  try {
    const state: { auth: IAuthState } = getState();
    const {
      auth: { currentUser },
    } = state;

    if (!currentUser?.activeKey) {
      throw new Error('Require connect CS');
    }

    return true;
  } catch (error) {
    return false;
  }
};

const validateHasHammerAccount = createAsyncThunk<
  unknown,
  void,
  {
    state: RootState;
    dispatch: AppDispatch;
  }
>('user/validateHasHammerAccount', async (_, { getState }) => {
  const state: { auth: IAuthState } = getState();
  const {
    auth: { currentUser },
  } = state;

  if (!currentUser?.activeKey) {
    throw new Error('Require connect CS');
  }
  const { activeKey } = currentUser;
  const url = `${API.loadNFTListing(activeKey)}?${qs.stringify({
    name: NFTTypeEnum.HAMMER,
    limit: 10,
    page: 1,
  })}`;
  const { data } = await axios.get(url, {
    signal,
  });

  if (!data) {
    return false;
  }

  return Boolean(data.nfts.length >= 1);
});

const mintHammerProcess = createAsyncThunk<
  unknown,
  unknown,
  {
    state: RootState;
    dispatch: AppDispatch;
  }
>(
  'user/mintHammerProcess',
  async ({ signMessageAsync }: any, { getState, dispatch }) => {
    const state: { auth: IAuthState } = getState();
    const isReady = await isReadyForDeployment(getState);

    if (!isReady) {
      throw new Error('Check Metamask connector');
    }

    const {
      auth: { currentUser },
    } = state;

    const { activeKey } = currentUser as UserType;

    const signedMessage = await signMessageAsync({
      message: `Mint-Whitelist-${activeKey}`,
      signingPublicKeyHex: activeKey,
    });

    if (!signedMessage) {
      throw new Error('Process has been cancelled');
    }

    const result: any = await dispatch(claimWhiteListAccount(signedMessage));

    return result;
  },
);

export {
  validateAccount,
  getUserProfile,
  claimWhiteListAccount,
  validateWhitelistAccount,
  validateHasHammerAccount,
  mintHammerProcess,
  isWhitelistedAccount,
};
