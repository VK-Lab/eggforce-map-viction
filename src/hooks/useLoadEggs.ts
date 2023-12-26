import { useMemo } from 'react';
import { useDebounce } from 'react-use';
import { useAppSelector as useSelector } from '@/app/hooks';
import isEqual from 'lodash/isEqual';
import configs from '@/constants/settings';
import {
  selectNFTCollectionModal,
  selectNFTCollections,
} from '@/modules/EggCollection/selectors';
import useInfiniteLoadNFTs from './useInfiniteLoadNFTs';
import { NFTTypeEnum } from '@/types/NFTItem';
import { getNFTDetails } from '@/modules/NFTDetail/utils';

const useLoadEggs = () => {
  const NFTCollectionData = useSelector(selectNFTCollectionModal, isEqual);
  const storeData = useSelector(selectNFTCollections, isEqual);
  const { loaded } = NFTCollectionData;
  const { hasMore, fetchMore, reloadFn, refetch, isValidating, isLoading } =
    useInfiniteLoadNFTs({
      viewMode: NFTTypeEnum.EGG,
    });

  useDebounce(
    () => {
      reloadFn();
    },
    configs.INTERVAL_DEBOUNCE_NFTS_API,
    [isValidating, storeData],
  );

  const eggsOnly = useMemo(() => {
    return storeData
      .filter((item) => item.name === NFTTypeEnum.EGG && item.metadata)
      .map((item) => {
        const transformed = getNFTDetails(item);

        return {
          ...item,
          classNFT: transformed?.classNFT?.value ?? '',
          imageUrl: transformed?.token_uri?.value ?? '',
        };
      });
  }, [storeData]);
  console.log(`🚀 ~ eggsOnly ~ eggsOnly:`, eggsOnly);

  return {
    hasMore,
    fetchMore,
    viewData: eggsOnly,
    isLoading,
    loaded,
    refetch,
    isValidating,
  };
};
export default useLoadEggs;
