import flatten from 'lodash/flatten';
import type { RootState } from '@/app/store';
import { DEFAULT_EGG_FILTER_VALUE, TypeEggFilterSpec } from './store';

const selectNFTCollectionModal = (state: RootState) => state.NFTCollection;
const selectNFTCollections = (state: RootState) =>
  flatten(state.NFTCollection.data) ?? [];
const selectNFTCollectionsRaw = (state: RootState) => state.NFTCollection.data;
const selectNFTCollectionsLoaded = (state: RootState) =>
  state.NFTCollection.loaded;
const selectNFTCollectionsFiltersState = (state: RootState) =>
  state.NFTCollection.filters;

const selectIsNFTFiltersDefault = (state: RootState) => {
  const { configs } = state.NFTCollection.filters;

  return Object.keys(configs).every(
    (filter) =>
      configs[filter as keyof TypeEggFilterSpec] === DEFAULT_EGG_FILTER_VALUE,
  );
};

export {
  selectIsNFTFiltersDefault,
  selectNFTCollectionModal,
  selectNFTCollectionsLoaded,
  selectNFTCollections,
  selectNFTCollectionsRaw,
  selectNFTCollectionsFiltersState,
};
