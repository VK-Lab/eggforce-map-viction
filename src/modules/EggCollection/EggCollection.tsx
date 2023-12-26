import { useCallback, useMemo } from 'react';
import { FilterCircle, FilterCircleFill } from 'react-bootstrap-icons';
import Container from 'react-bootstrap/Container';
// import cn from 'classnames';
import isEqual from 'lodash/isEqual';
import { Heading } from '@/components/Typography';
import NFTGridItem from '@/components/NFTGridItem';
import useInfiniteLoadNFTs from '@/hooks/useInfiniteLoadNFTs';
import EmptyEggCollection from './EmptyEggCollection';
import type { NFTItem } from '@/types/NFTItem';
import MODULES_PERMISSION from '@/constants/modulesPermission';
import Spinner from 'react-bootstrap/Spinner';
import { useAppSelector as useSelector } from '@/app/hooks';
import { selectNFTCollectionModal } from '@/modules/EggCollection/selectors';
import { useAppDispatch as useDispatch } from '@/app/hooks';
import { useDebounce } from 'react-use';
import configs from '@/constants/settings';
import { NFTTypeEnum } from '@/types/NFTItem';
import InfiniteLoader from '@/components/InfiniteLoader';
import GSelect from '@/components/GSelect';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { defaultLimitOptions } from '@/modules/EggCollection/store';
import { selectIsNFTFiltersDefault } from '@/modules/EggCollection/selectors';
import {
  TypeEggFilterSpec,
  NFTCollectionModalActions,
  DEFAULT_EGG_FILTER_VALUE,
} from './store';
import { filterEggsData } from './utils';
import EggCollectionTabs from './EggCollectionTabs';

const EggCollection = () => {
  const IS_HATCHING_MODULE_ENABLED = MODULES_PERMISSION.USE_NFT_INCUBATING;
  const dispatch = useDispatch();
  const isNFTFiltersDefault = useSelector(selectIsNFTFiltersDefault, isEqual);
  const {
    hasMore,
    fetchMore,
    countEggs,
    countHammers,
    countDragons,
    storeData,
    data,
    refetch,
    isValidating,
    isLoading,
    reloadFn,
  } = useInfiniteLoadNFTs();
  const nftCollectionModalState = useSelector(selectNFTCollectionModal);
  const { deployHash, viewMode, filters, pagination } = nftCollectionModalState;

  useDebounce(
    () => {
      reloadFn();
    },
    configs.INTERVAL_DEBOUNCE_NFTS_API,
    [isValidating, storeData],
  );
  const options = useMemo(
    () =>
      defaultLimitOptions.map((value: number) => ({
        value: value.toString(),
        label: `${value.toString()} NFTs`,
      })),
    [],
  );
  const filterCount = useMemo(() => {
    const { configs } = filters;
    const count = Object.keys(configs).filter(
      (item) =>
        configs[item as keyof TypeEggFilterSpec] !== DEFAULT_EGG_FILTER_VALUE,
    );
    return count.length;
  }, [filters]);
  const viewData = useMemo(() => {
    if (!data?.length) {
      return [];
    }

    return filterEggsData(data, filters.configs, viewMode);
  }, [data, filters, viewMode]);

  const onClickFilterModal = useCallback(() => {
    if (!filters.modal.open) {
      dispatch(NFTCollectionModalActions.setFiltersConfigsModal(true));
    }
  }, [dispatch, filters.modal]);

  const onSelectTab = useCallback(
    (tabName: NFTTypeEnum) => {
      if (viewMode !== tabName) {
        dispatch(NFTCollectionModalActions.setViewMode(tabName));
        if (!isNFTFiltersDefault) {
          dispatch(NFTCollectionModalActions.resetFiltersConfigs());
        }
        dispatch(
          NFTCollectionModalActions.resetPagination({
            resetLimit: false,
          }),
        );
      }
    },
    [dispatch, isNFTFiltersDefault, viewMode],
  );

  const onChangeLimitPerPage = useCallback(
    (value: number) => {
      dispatch(NFTCollectionModalActions.setPageLimitPerPage(value));
      dispatch(NFTCollectionModalActions.setPageIndex(1));
    },
    [dispatch],
  );

  if ((isLoading || isValidating) && pagination.page === null) {
    return (
      <div className="empty-data--wrapper">
        <div className="icon--loading">
          <Spinner animation="grow" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Heading h={2} className="modal--heading text-center">
        NFT Collection
      </Heading>
      <Container fluid className="nft-grid--container">
        <div className="nft-grid-buttons">
          <div className="column nft-grid-buttons--left">
            <EggCollectionTabs
              onSelectTab={onSelectTab}
              viewMode={viewMode}
              countDragons={countDragons}
              countEggs={countEggs}
              countHammers={countHammers}
            />
          </div>
          <div className="column nft-grid-buttons--right">
            <div className="collection--filter-wrapper">
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id={`limit-loading-per-age`}>
                    {`${pagination.limit} NFTs`}
                  </Tooltip>
                }
              >
                <span className="label">Limits</span>
              </OverlayTrigger>
              <GSelect
                defaultValue={options[0]}
                options={options}
                onChange={({ value }: any) => {
                  onChangeLimitPerPage(parseInt(value, 10));
                }}
              />
            </div>
            {IS_HATCHING_MODULE_ENABLED &&
              (viewMode === NFTTypeEnum.EGG ||
                viewMode === NFTTypeEnum.DRAGON) && (
                <button
                  onClick={onClickFilterModal}
                  className="btn--trigger-egg-filters"
                >
                  {filterCount > 0 && (
                    <span className="circle">{filterCount}</span>
                  )}
                  {filters.modal.open ? (
                    <FilterCircleFill className="icon-filter" />
                  ) : (
                    <FilterCircle className="icon-filter" />
                  )}
                </button>
              )}
          </div>
        </div>
        {!isLoading && !isValidating && !viewData.length ? (
          <EmptyEggCollection
            isMinting={Boolean(deployHash.length)}
            isLoading={isLoading}
            isValidating={isValidating}
            reload={refetch}
          />
        ) : (
          <>
            <div className="nft-grid--wrapper">
              {viewData.map((item: NFTItem) => (
                <div key={item.tokenId} className="column">
                  <NFTGridItem data={item} />
                </div>
              ))}
            </div>
            <InfiniteLoader
              hasMore={hasMore}
              fetchMore={fetchMore}
              loading={isValidating}
            />
          </>
        )}
      </Container>
    </div>
  );
};

export default EggCollection;
