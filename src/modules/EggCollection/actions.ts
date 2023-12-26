import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '@/app/store';
import { NFTTypeEnum } from '@/types/NFTItem';
import { NFTCollectionsSpec, NFTCollectionModalActions } from './store';

export const removeEggWidthIds = createAsyncThunk<
  unknown,
  unknown,
  {
    state: RootState;
    dispatch: AppDispatch;
  }
>(
  'NFTCollectionModal/removeEggWidthIds',
  async (tokenIds: any, { getState, dispatch, signal }) => {
    try {
      const state: { NFTCollection: NFTCollectionsSpec } = getState();
      const {
        NFTCollection: { data },
      } = state;

      const newList = data.map((pageNFTData) => {
        return pageNFTData.filter((item: any) => {
          if (item.name === NFTTypeEnum.EGG) {
            if (tokenIds.includes(item.tokenId)) {
              return false;
            }

            return true;
          }
          return true;
        });
      });

      dispatch(NFTCollectionModalActions.setData(newList));
    } catch (error: any) {
      console.log(`🚀 ~ error:`, error.message);
      return;
    } finally {
    }
  },
);

export const lockEggWidthIds = createAsyncThunk<
  unknown,
  unknown,
  {
    state: RootState;
    dispatch: AppDispatch;
  }
>(
  'NFTCollectionModal/lockEggWidthIds',
  async (tokenIds: any, { getState, dispatch, signal }) => {
    try {
      const state: { NFTCollection: NFTCollectionsSpec } = getState();
      const {
        NFTCollection: { data },
      } = state;

      /**
       * TODO: Update new logic based on Paginated data
       */
      const newList = data.map((pageNFTData) => {
        return pageNFTData.map((item: any) => {
          if (
            item.name === NFTTypeEnum.EGG &&
            tokenIds.includes(item.tokenId)
          ) {
            return {
              ...item,
              egg: {
                ...(item?.egg && { ...item.egg }),
                isProcessing: true,
              },
            };
          }
          return item;
        });
      });
      // const eggs = newList.filter((item: any) => item.name === NFTTypeEnum.EGG);
      dispatch(NFTCollectionModalActions.setData(newList));
      dispatch(NFTCollectionModalActions.setLoadedState(false));
    } catch (error: any) {
      console.log(`🚀 ~ error:`, error.message);
      return;
    } finally {
    }
  },
);

interface DataListingSpec {
  nfts: Array<any>;
  pageCount: number;
  itemCount: number;
}

export const mergeNFTInfiniteData = createAsyncThunk<
  unknown,
  {
    serverData: Array<DataListingSpec>;
  },
  {
    state: RootState;
    dispatch: AppDispatch;
  }
>(
  'NFTCollectionModal/mergeNFTInfiniteData',
  async ({ serverData }, { dispatch }) => {
    try {
      const finalData = serverData?.map((item) => item.nfts);
      dispatch(NFTCollectionModalActions.setData(finalData));

      if (serverData.length) {
        const samplePage = serverData[0];
        dispatch(
          NFTCollectionModalActions.setPaginationData({
            page: serverData.length,
            total: samplePage.pageCount,
            totalItems: samplePage.itemCount,
          }),
        );
      }
    } catch (error: any) {
      console.log(`🚀 ~ error:`, error.message);
      return;
    } finally {
    }
  },
);
