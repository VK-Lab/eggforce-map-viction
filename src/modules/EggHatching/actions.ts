import isEmpty from 'lodash/isEmpty';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { axios } from '@/services/axios';
import API from '@/constants/api';
import { AppDispatch, RootState } from '@/app/store';
import { IAuthState } from '@/modules/Auth/store';
import {
  VOTE_FEE,
  ENTRY_POINT_UNDELEGATE,
  ENTRY_POINT_DELEGATE,
} from '@/constants/key';
import { INFTDetail } from '@/modules/NFTDetail/store';
import { isReadyForDeployment } from '@/modules/Auth/actions';
import type { UserType } from '@/modules/Auth/store';
import { executeErrorMessage } from '@/services/errorsWrapper';
import { handleDeployResult } from '@/modules/EggPurchase/actions';
import { lockAndReloadEggDetail } from '@/modules/NFTDetail/actions';
import { isValidDeployResult } from '@/helpers/deploy';
import type { SignedDeployResult } from '@/types/deploy';
import { eggHatchingSelectActions } from './store';
import {
  ClaimDetailsSpec,
  StakeDetailsSpec,
  MakeDragonDetailsSpec,
} from '@/types/EggActions';
import { TypeMote } from '@/types/balance';
import { EggForceConfigurationEnum } from '@/types/generic';
import { dragonManagementActions } from '@/modules/DragonManagementModule/store';
import { parseViction } from '@/helpers/balance';

interface EggHatchingParams {
  tokenId: string;
  hatchDetails: any;
  hatch?: any;
}

interface EggEvolveDragonParams {
  tokenId: string;
  paymentAmount: TypeMote;
  makeDragon?: any;
}

export const triggerEggSelectingModal = createAsyncThunk<
  unknown,
  Partial<EggHatchingParams> & {
    nftType: string;
  },
  {
    dispatch: AppDispatch;
  }
>('eggHatching/triggerModal', async ({ nftType, tokenId }, { dispatch }) => {
  dispatch(eggHatchingSelectActions.selectNFT({ nftType, tokenId }));
  dispatch(eggHatchingSelectActions.showModal());
});

export const startEggHatchingProcess = createAsyncThunk<
  unknown,
  Partial<EggHatchingParams>,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  'eggHatching/startEggHatchingProcess',
  async ({ tokenId, hatchDetails, hatch }, { dispatch, getState }) => {
    const state: { auth: IAuthState } = getState();
    const {
      auth: { configuration },
    } = state;

    if (!tokenId) {
      throw new Error('Missing tokenId');
    }

    try {
      const isReady = await isReadyForDeployment(getState, [
        EggForceConfigurationEnum.AUCTION_CONTRACT_HASH,
      ]);

      if (!isReady) {
        throw new Error('Check Metamask connector');
      }

      const stakeDetails: StakeDetailsSpec = {
        fromAddress: hatchDetails.fromAddress,
        validator: hatchDetails.validator,
        amount: hatchDetails.amount,
        fee: hatchDetails.fee,
        entryPoint: ENTRY_POINT_DELEGATE,
        auctionHash: configuration.AUCTION_CONTRACT_HASH!,
      };

      const result: SignedDeployResult = await hatch(stakeDetails);
      console.log(`🚀 ~ >>>> result:`, result);

      if (isEmpty(result)) {
        return;
      }

      if (isValidDeployResult(result)) {
        await dispatch(
          handleDeployResult({
            result,
            message: `Incubating process for token ${tokenId} is sent`,
            toastId: `Incubating-${tokenId}`,
            metadata: {
              from: 'nftDetail',
              id: tokenId,
              action: 'incubate',
            },
            onCompleted: () => {
              dispatch(lockAndReloadEggDetail({ tokenId }));
            },
          }),
        ).unwrap();

        const response = await axios.post(
          API.incubateStart(tokenId),
          result.signedDeploy,
        );

        if (response?.status === 200) {
          return {
            ...response.data,
            deployHash: result.deployHash,
          };
        }
        return;
      }

      return undefined;
    } catch (error: any) {
      executeErrorMessage(error);
      return;
    } finally {
    }
  },
);

export const stopEggHatchingProcess = createAsyncThunk<
  unknown,
  unknown,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  'eggHatching/stopEggHatchingProcess',
  async (
    { tokenId, claim, undelegate, shouldUndelegate = false }: any,
    { dispatch, getState },
  ) => {
    const state: { auth: IAuthState; NFTDetail: INFTDetail } = getState();
    const {
      auth: { currentUser, configuration },
      NFTDetail,
    } = state;
    const { activeKey } = currentUser as UserType;

    try {
      let signResponse: SignedDeployResult | undefined = undefined;
      const isReady = await isReadyForDeployment(getState, [
        EggForceConfigurationEnum.AUCTION_CONTRACT_HASH,
        EggForceConfigurationEnum.ADMIN_ADDRESS,
      ]);

      if (!isReady) {
        throw new Error('Check Metamask connector');
      }

      // Stop incubate and undelegate
      if (shouldUndelegate && NFTDetail.data) {
        const { data } = NFTDetail;
        const { egg } = data;

        /**
         * TODO VIC UNDELEGATE
         */
        const stakeDetails: StakeDetailsSpec = {
          fromAddress: activeKey,
          validator: egg.validator,
          // validator: configs.VIC_VALIDATOR, // egg.validator,
          amount: 100, //egg.stakedAmount,
          fee: VOTE_FEE,
          entryPoint: ENTRY_POINT_UNDELEGATE,
          auctionHash: configuration.AUCTION_CONTRACT_HASH!,
        };

        signResponse = await undelegate(stakeDetails);
      }

      // Stop hatching only
      if (!shouldUndelegate) {
        const unhatchDetails: ClaimDetailsSpec = {
          fromAddress: activeKey,
          toAddress: configuration.ADMIN_ADDRESS!,
          fee: configuration.TOKEN_TRANSFER_FEE as TypeMote,
          amount: configuration.STOP_ONLY_FEE as TypeMote,
        };
        signResponse = await claim(unhatchDetails);
      }

      if (isEmpty(signResponse)) {
        return;
      }

      if (isValidDeployResult(signResponse)) {
        const response = await axios.post(API.incubateStop(tokenId), {
          ...signResponse!.signedDeploy,
        });

        return {
          apiResponse: response?.data ?? undefined,
          deployResult: {
            deployHash: signResponse?.deployHash,
            signedDeploy: {
              ...(signResponse?.signedDeploy?.deploy ?? {}),
            },
          },
        };
      }

      return undefined;
    } catch (error: any) {
      executeErrorMessage(error);
      return;
    } finally {
    }
  },
);

export const claimSNCProcess = createAsyncThunk<
  unknown,
  unknown,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  'eggHatching/claimSNCProcess',
  async ({ claim, tokenId, claimAmount }: any, { dispatch, getState }) => {
    console.log(`🚀 ~ claimAmount:`, claimAmount);
    const state: { auth: IAuthState; NFTDetail: INFTDetail } = getState();
    const {
      auth: { currentUser, configuration },
    } = state;
    const { activeKey } = currentUser as UserType;
    try {
      const isReady = await isReadyForDeployment(getState, [
        EggForceConfigurationEnum.ADMIN_ADDRESS,
      ]);

      if (!isReady) {
        throw new Error('Check Metamask connector');
      }

      const amountBigInt = parseViction(claimAmount.toString());
      const claimDetails: any = {
        fromAddress: activeKey,
        toAddress: configuration.ADMIN_ADDRESS!,
        fee: configuration.TOKEN_TRANSFER_FEE as TypeMote,
        amount: amountBigInt,
      };
      const signResponse: SignedDeployResult = await claim(claimDetails);
      console.log(`🚀 ~ signResponse:`, signResponse);

      if (isValidDeployResult(signResponse)) {
        const response = await axios.post(API.claim(tokenId), {
          snc: amountBigInt?.toString(),
        });
        console.log(`🚀 ~ response ~ response:`, response);

        return {
          apiResponse: response?.data ?? undefined,
          deployResult: signResponse,
        };
      }

      return undefined;
    } catch (error: any) {
      executeErrorMessage(error);
      return;
    } finally {
    }
  },
);

export const evoluteEggToDragonProcess = createAsyncThunk<
  unknown,
  EggEvolveDragonParams,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  'eggEvolution/evoluteEggToDragonProcess',
  async ({ paymentAmount, makeDragon, tokenId }, { dispatch, getState }) => {
    try {
      const isReady = await isReadyForDeployment(getState, [
        EggForceConfigurationEnum.DRAGON_BROKER_CONTRACT_HASH,
        EggForceConfigurationEnum.TOKEN_CONTRACT_HASH,
      ]);

      if (!isReady) {
        throw new Error('Check Metamask connector');
      }

      if (!makeDragon) {
        throw new Error('Required makeDragon handler');
      }

      const makeDragonDetails: MakeDragonDetailsSpec = {
        tokenId,
        paymentAmount,
      };
      const deployResult: SignedDeployResult = await makeDragon(
        makeDragonDetails,
      );

      if (isValidDeployResult(deployResult)) {
        // Set loading
        dispatch(dragonManagementActions.setMakeStatusLoading(true));
        const response = await axios.post(
          API.makeDragon(tokenId),
          deployResult?.signedDeploy,
        );

        return {
          apiResponse: response?.data ?? undefined,
          deployResult: deployResult,
        };
      }

      return undefined;
    } catch (error: any) {
      executeErrorMessage(error);
      dispatch(dragonManagementActions.setMakeStatusLoading(false));
      return;
    } finally {
    }
  },
);
