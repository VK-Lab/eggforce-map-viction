import React, { useCallback } from 'react';
import cn from 'classnames';
import Balancer from 'react-wrap-balancer';
import { QuestionCircleFill } from 'react-bootstrap-icons';
import { TouchBackend } from 'react-dnd-touch-backend';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Spinner from 'react-bootstrap/Spinner';
import {
  useAppDispatch as useDispatch,
  useAppSelector as useSelector,
} from '@/app/hooks';
import useDevice from '@/hooks/useDevice';
import { Box } from './Box';
import { ItemTypes } from '@/types/EggMerge';
import useLoadEggs from '@/hooks/useLoadEggs';
import Button from '@/components/GButton';
import useEggMerging from '@/hooks/useEggMerging';
import EmptyEggCollection from '@/modules/EggCollection/EmptyEggCollection';
import { eggMergingActions } from '@/modules/EggMerging/store';
import { useAppDispatch } from '@/app/hooks';
import CustomScrollbar from '@/components/CustomScrollbar';
import EggMergingInstructionModal from './EggMergingInstructionModal';
import EggPlaceholderWrapper from './EggPlaceholderWrapper';
import EggMergingStatusModal from './EggMergingStatusModal';
import { Heading } from '@/components/Typography';
import messages from '@/modules/EggMerging/messages';
import iconMerge from '@/assets/images/icon--merge.png';
import InfiniteLoader from '@/components/InfiniteLoader';
import { selectNFTCollectionModal } from '@/modules/EggCollection/selectors';
import NetworkFeePanel from '@/components/NetworkFeePanel';
import { selectEggMergingStatusModal } from '@/modules/EggMerging/selectors';

const EggMergingMain = ({
  isValidating,
  refetch,
  eggs,
  isLoading,
  hasMore,
  fetchMore,
}: any) => {
  const dispatch = useAppDispatch();
  const {
    paymentAmount,
    eggPlaceholders,
    getDroppedEgg,
    validate,
    shouldDisableMergeButton,
    merge,
    isDeploying,
    isDropped,
    handleDrop,
    handleRemove,
  } = useEggMerging({ eggs, refetch });
  const nftCollectionModalState = useSelector(selectNFTCollectionModal);
  const { pagination } = nftCollectionModalState;
  const onStartMergingHandler = useCallback(async () => {
    const resultValidate = validate();
    if (!resultValidate) {
      return;
    }

    await merge(eggPlaceholders);
  }, [eggPlaceholders, merge, validate]);

  const onClickMergeInstructionModal = useCallback(() => {
    dispatch(eggMergingActions.showMergeInstructionModal());
  }, [dispatch]);

  const renderBoxes = useCallback(() => {
    if (isLoading && pagination.page === null) {
      return (
        <div className="icon--loading">
          <Spinner animation="grow" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      );
    }

    if (!isLoading && !eggs?.length) {
      // If deployHash appears as a list, this means a minting process in in progress
      return (
        <EmptyEggCollection
          isValidating={isValidating}
          isLoading={isLoading}
          reload={refetch}
        />
      );
    }

    return (
      <div style={{ height: 610 }}>
        <CustomScrollbar isAlwaysVisible>
          <div className="nft-grid-compact--container">
            {eggs?.map((item: any) => (
              <Box
                key={`egg-box--${item.tokenId}`}
                item={item}
                type={ItemTypes.EGG}
                isDropped={isDropped(item.tokenId)}
                isDeploying={isDeploying}
                primaryElement={
                  eggPlaceholders?.[0]?.lastDroppedItem ?? undefined
                }
              />
            ))}
          </div>
          <InfiniteLoader
            hasMore={hasMore}
            fetchMore={fetchMore}
            loading={isLoading}
          />
        </CustomScrollbar>
      </div>
    );
  }, [
    isLoading,
    pagination.page,
    eggs,
    hasMore,
    fetchMore,
    isValidating,
    refetch,
    isDropped,
    isDeploying,
    eggPlaceholders,
  ]);

  return (
    <div className="egg-merge--root">
      <div className="egg-merge--left-column">
        <EggPlaceholderWrapper
          onRemove={handleRemove}
          onDrop={handleDrop}
          slots={eggPlaceholders}
          getDroppedEgg={getDroppedEgg}
          isDeploying={isDeploying}
        />
        <NetworkFeePanel fee={paymentAmount} />
        <div className="egg-merge-action--wrapper">
          <Button
            disabled={shouldDisableMergeButton}
            btnStyle="5"
            onClick={onStartMergingHandler}
            className={'btn--nft-action inside-nft-detail btn--start-merging'}
            size="large"
          >
            <img
              className="icon icon--merge"
              src={iconMerge}
              alt="Start Merging"
            />
            START MERGING
          </Button>
          <button
            onClick={onClickMergeInstructionModal}
            className={'icon--how-to-merge'}
          >
            <QuestionCircleFill />
          </button>
        </div>
      </div>
      <div
        className={cn('egg-merge--right-column', {
          'is-loading': isLoading,
        })}
      >
        {renderBoxes()}
      </div>
    </div>
  );
};

const EggMergingLayout = () => {
  const dispatch = useDispatch();
  const isDevice = useDevice();
  const { hasMore, fetchMore, refetch, isValidating, isLoading, viewData } =
    useLoadEggs();
  const onCloseHandler = useCallback(() => {
    dispatch(eggMergingActions.hideMergeStatusModal());
  }, [dispatch]);

  return (
    <div className="egg-merging-layout">
      <div className="header">
        <Heading h={2}>Egg Merging</Heading>
        <Heading h={4}>Increase your chances for a Legendary Dragon</Heading>
        <Balancer className="body">{messages.intro.defaultMessage}</Balancer>
      </div>
      <DndProvider backend={isDevice ? TouchBackend : HTML5Backend}>
        <EggMergingMain
          isValidating={isValidating}
          refetch={refetch}
          isLoading={isLoading}
          eggs={viewData}
          hasMore={hasMore}
          fetchMore={fetchMore}
        />
        <EggMergingStatusModal
          onClose={onCloseHandler}
          selector={selectEggMergingStatusModal}
        />
      </DndProvider>
      <EggMergingInstructionModal />
    </div>
  );
};

export default EggMergingLayout;
