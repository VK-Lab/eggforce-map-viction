import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '@/app/store';
import { IAuthState } from '@/modules/Auth/store';
import { isReadyForDeployment } from '@/modules/Auth/actions';
import type { UserType } from '@/modules/Auth/store';
import { executeErrorMessage } from '@/services/errorsWrapper';

export const mergeEggsProcess = createAsyncThunk<
  unknown,
  unknown,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  'eggMerging/mergeEggsProcess',
  async ({ tokenId, mergedTokenIds, paymentAmount }: any, { getState }) => {
    const state: { auth: IAuthState } = getState();
    const {
      auth: { currentUser, configuration },
    } = state;
    const { activeKey } = currentUser as UserType;
    try {
      const isReady = await isReadyForDeployment(getState);

      if (!isReady) {
        throw new Error('Check Metamask connector');
      }

      // const finalMergedTokenIds = [...mergedTokenIds, tokenId];

      // return buildMergeTokensDeploy({
      //   key: activeKey,
      //   contract: configuration.TOKEN_CONTRACT_HASH,
      //   mergedTokenIds: finalMergedTokenIds,
      //   paymentAmount: String(paymentAmount),
      // });

      return undefined;
    } catch (error: any) {
      console.log(`🚀 ~ error:`, error.message);
      executeErrorMessage(error);
      return;
    } finally {
    }
  },
);
