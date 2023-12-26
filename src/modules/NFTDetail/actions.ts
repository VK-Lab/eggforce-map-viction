import { createAsyncThunk } from '@reduxjs/toolkit';
import { axios } from '@/services/axios';
import API from '@/constants/api';
import { AppDispatch, RootState } from '@/app/store';
import { IAuthState } from '@/modules/Auth/store';
import { transformToNFTDetailType } from './utils';
import { INFTDetail, NFTDetailModalActions } from './store';
import { lockEggWidthIds } from '@/modules/EggCollection/actions';

export const getNFTDetail = createAsyncThunk<
  unknown,
  unknown,
  {
    state: RootState;
    dispatch: AppDispatch;
  }
>(
  'NFTDetailModal/getNFTDetail',
  async ({ apiCallback, tokenId }: any, { getState, dispatch, signal }) => {
    try {
      dispatch(NFTDetailModalActions.setLoading(true));
      const state: { auth: IAuthState; NFTDetail: INFTDetail } = getState();
      const {
        auth: { currentUser },
      } = state;

      if (!currentUser?.activeKey) {
        throw new Error('Missing public key');
      }

      const result = await axios.get(apiCallback(tokenId), {
        signal,
      });
      return result;
    } catch (error: any) {
      console.log(`🚀 ~ error:`, error.message);
      return;
    } finally {
      dispatch(NFTDetailModalActions.setLoading(false));
    }
  },
);

export const getDragonNFTDetail = createAsyncThunk<
  unknown,
  unknown,
  {
    state: RootState;
    dispatch: AppDispatch;
  }
>(
  'NFTDetailModal/getDragonNFTDetail',
  async ({ originalEggId, editionId }: any, { getState, dispatch, signal }) => {
    try {
      if (!originalEggId) {
        return;
      }

      const state: { auth: IAuthState; NFTDetail: INFTDetail } = getState();
      const { NFTDetail } = state;
      const { data } = NFTDetail;

      const result: any = await dispatch(
        getNFTDetail({
          tokenId: originalEggId,
          apiCallback: API.detail,
        }),
      ).unwrap();
      const dataServer = result.data;
      dispatch(
        NFTDetailModalActions.setData({
          ...data,
          originalEgg: {
            id: originalEggId,
            uri: dataServer?.egg?.metadata?.token_uri ?? undefined,
          },
        }),
      );
    } catch (error: any) {
      console.log(`🚀 ~ error:`, error.message);
      return;
    } finally {
      dispatch(NFTDetailModalActions.setLoading(false));
    }
  },
);

// https://github.com/reduxjs/redux-toolkit/issues/2147
export const getEggDetail = createAsyncThunk<
  unknown,
  unknown,
  {
    state: RootState;
    dispatch: AppDispatch;
  }
>(
  'NFTDetailModal/getEggDetail',
  async ({ tokenId }: any, { getState, dispatch, signal }) => {
    try {
      dispatch(NFTDetailModalActions.setLoading(true));
      const state: { auth: IAuthState; NFTDetail: INFTDetail } = getState();
      const {
        auth: { currentUser },
        NFTDetail,
      } = state;

      if (!currentUser?.activeKey) {
        throw new Error('Missing public key');
      }

      const { data } = await axios.get(API.detail(tokenId), {
        signal,
      });
      const { egg, result } = data;

      if (!result) {
        return;
      }

      if (egg) {
        const { data } = NFTDetail;
        const newDetail = transformToNFTDetailType(data, egg);
        dispatch(NFTDetailModalActions.setData(newDetail));
      }
    } catch (error: any) {
      console.log(`🚀 ~ error:`, error.message);
      return;
    } finally {
      dispatch(NFTDetailModalActions.setLoading(false));
    }
  },
);

export const lockAndReloadEggDetail = createAsyncThunk<
  unknown,
  unknown,
  {
    state: RootState;
    dispatch: AppDispatch;
  }
>(
  'NFTDetailModal/lockAndReloadEggDetail',
  async ({ tokenId, shouldReloadNFTs = true }: any, { dispatch }) => {
    try {
      dispatch(NFTDetailModalActions.lockNFT());
      dispatch(getEggDetail({ tokenId }));

      if (shouldReloadNFTs) {
        dispatch(lockEggWidthIds([tokenId]));
      }
    } catch (error: any) {
      console.log(`🚀 ~ error:`, error.message);
      return;
    } finally {
    }
  },
);
