import { useCallback, useEffect, useMemo } from 'react';
import qs from 'qs';
import useSWRInfinite from 'swr/infinite';
import isEqual from 'lodash/isEqual';
import { fetcherWithArray } from '@/services/axios';
import useCurrentUser from '@/hooks/useCurrentUser';
import API from '@/constants/api';
import {
  useAppDispatch as useDispatch,
  useAppSelector as useSelector,
} from '@/app/hooks';
import {
  selectNFTCollectionModal,
  selectNFTCollections,
} from '@/modules/EggCollection/selectors';
import { NFTTypeEnum } from '@/types/NFTItem';
import { mergeNFTInfiniteData } from '@/modules/EggCollection/actions';

interface useLoaddNFTsSpec {
  skip?: boolean;
  viewMode?: NFTTypeEnum;
}

interface DataListingSpec {
  nfts: Array<any>;
  pageCount: number;
  itemCount: number;
}

const useInfiniteLoadNFTs = (
  { skip, viewMode: viewModeProp }: useLoaddNFTsSpec = {
    skip: false,
    viewMode: undefined,
  },
) => {
  const dispatch = useDispatch();
  const user = useCurrentUser();
  const { viewMode: viewModeRedux, pagination } = useSelector(
    selectNFTCollectionModal,
    isEqual,
  );
  const storeData = useSelector(selectNFTCollections, isEqual);
  const viewMode = viewModeProp ? viewModeProp : viewModeRedux;

  const { data, error, mutate, isLoading, isValidating, size, setSize } =
    useSWRInfinite((pageIndex: number, previousPageData: DataListingSpec) => {
      // reached the end
      if (previousPageData?.nfts && !previousPageData?.nfts?.length) {
        return null;
      }

      const finalParams = qs.stringify({
        name: viewMode,
        limit: pagination.limit,
        page: pageIndex === 0 ? 1 : pageIndex + 1,
      });
      return [API.loadNFTListing(user.activeKey), finalParams]; // SWR key
    }, fetcherWithArray);

  const hasMore = useMemo(() => {
    if (!size || !pagination?.totalItems) {
      return false;
    }

    const currentListing = pagination.limit * size;
    return currentListing < pagination.totalItems;
  }, [pagination.limit, pagination.totalItems, size]);
  const viewData = useMemo(() => {
    return storeData.filter((item) => item.metadata);
  }, [storeData]);

  const { countDragons, countEggs, countHammers } = useMemo(() => {
    return {
      countEggs:
        storeData.filter((item) => item.name === NFTTypeEnum.EGG).length ?? 0,
      countHammers:
        storeData.filter((item) => item.name === NFTTypeEnum.HAMMER).length ??
        0,
      countDragons:
        storeData.filter((item) => item.name === NFTTypeEnum.DRAGON).length ??
        0,
    };
  }, [storeData]);

  /**
   * reloadNFTs only reload current data, this supports
   * fetching latest Egg isProcessing mode
   */
  const reloadNFTs = useCallback(() => {
    if (!isValidating && storeData?.length) {
      const eggs = storeData.filter(
        (item) => item.name === NFTTypeEnum.EGG && item?.egg?.isProcessing,
      );

      if (eggs?.length) {
        console.log('>>>> Reload NFTs');
        mutate();
      }
    }
  }, [isValidating, mutate, storeData]);

  /**
   * Load more egg NFTs
   */
  const fetchMore = useCallback(() => {
    if (!hasMore) {
      console.log('>>>> STOP <<<<');
      return;
    }

    setSize(size + 1);
  }, [hasMore, setSize, size]);

  useEffect(() => {
    if (!data) {
      return;
    }

    dispatch(mergeNFTInfiniteData({ serverData: data }));
  }, [isLoading, data, dispatch]);

  // Comment out this to use real data
  // return {
  //   data: mock,
  //   isLoading: false,
  //   isError: false
  // }

  return {
    hasMore,
    fetchMore,
    refetch: mutate,
    reloadFn: reloadNFTs,
    data: viewData ?? [],
    countEggs,
    countHammers,
    countDragons,
    isValidating,
    isLoading: isLoading || Boolean(!skip && !error && !data),
    isError: error,
    storeData,
  };
};

export default useInfiniteLoadNFTs;
