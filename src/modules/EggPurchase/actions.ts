import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '@/app/store';
import { IAuthState } from '@/modules/Auth/store';
import { sharedToastProps, toast } from '@/services/toast';
import { DeployStatus } from '@/types/deploy';
import {
  IEggPurchase,
  EggPurchaseStoreActions,
} from '@/modules/EggPurchase/store';
import type { UserType } from '@/modules/Auth/store';
import { setDynamicLocalStorageItem } from '@/services/localStorage';

export const sendMintResultWithAffiliateInfo = createAsyncThunk<
  unknown,
  {
    codeAffiliate: null | string;
  },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  'EggPurchaseEgg/sendMintResultWithAffiliateInfo',
  async (data, { dispatch, getState }) => {
    const { codeAffiliate } = data;
    console.log(`🚀 ~ codeAffiliate:`, codeAffiliate);
  },
);

export const handleDeployResult = createAsyncThunk<
  unknown,
  unknown,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  'EggPurchaseEgg/handleDeployResult',
  async (data: any, { dispatch, getState }) => {
    const state: { auth: IAuthState; eggPurchase: IEggPurchase } = getState();
    const {
      auth: { currentUser },
      eggPurchase: { deployHash },
    } = state;

    try {
      const { activeKey } = currentUser as UserType;
      const cacheKey = `deployHashesStore/${activeKey}`;
      const {
        result,
        message = undefined,
        onCompleted,
        toastId = undefined,
        metadata = undefined,
        configs = {
          skipStoringDeploy: false,
        },
      } = data;

      /**
       * Make sure result has following props:
       *  deployHash: String,
       *  signedDeploy: object {
       *    approvals: [],
       *    hash: String,
       *    header: object
       *    payment: object
       *    session: object
       *  }
       */
      if (
        result?.deployHash &&
        typeof result?.deployHash === 'string' &&
        result?.signedDeploy
      ) {
        if (message) {
          toast.success(message, {
            ...sharedToastProps,
            autoClose: true,
            ...(toastId && {
              toastId,
            }),
          });
        }

        /**
         * Some API e.g: Stop hatching & Undelegate unchecked
         * doesn't need storing deploy
         */
        if (!configs?.skipStoringDeploy) {
          const newDeploy = {
            hash: result.deployHash,
            createdAt: new Date().toISOString(),
            status: DeployStatus.PENDING,
            type: 'deploy',
            ...(metadata && {
              metadata: {
                ...metadata,
              },
            }),
          };

          const newDeployHashes = deployHash.length
            ? [newDeploy, ...deployHash]
            : [newDeploy];

          // Add latest deploy hash to redux store
          await setDynamicLocalStorageItem(cacheKey, newDeployHashes);
          dispatch(EggPurchaseStoreActions.addDeploy(newDeploy));
        }

        onCompleted && onCompleted(result.deployHash);
      }

      return result;
    } catch (error: any) {
      console.log(`🚀 ~ > ~ error:`, error.message);
    } finally {
    }
  },
);
