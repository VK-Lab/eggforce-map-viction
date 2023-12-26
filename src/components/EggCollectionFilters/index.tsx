import { useCallback, useRef } from 'react';
import { animated, useSpring } from 'react-spring';
import { XLg } from 'react-bootstrap-icons';
import { useClickAway } from 'react-use';
import {
  useAppDispatch as useDispatch,
  useAppSelector as useSelector,
} from '@/app/hooks';
import { selectNFTCollectionsFiltersState } from '@/modules/EggCollection/selectors';
import { NFTCollectionModalActions } from '@/modules/EggCollection/store';
import EggFiltersPanel from './EggFiltersPanel';

const EggCollectionFilters = () => {
  const dispatch = useDispatch();
  const nftFiltersModal = useSelector(selectNFTCollectionsFiltersState);
  const {
    modal: { open },
  } = nftFiltersModal;
  const wrapperStyles = useSpring({
    reverse: false,
    to: {
      transform: !open ? 'translate(100px, -50%)' : 'translate(0px, -50%)',
      opacity: !open ? 0 : 1,
    },
  });

  const ref = useRef(null);
  useClickAway(ref, (e) => {
    if (!open) {
      return;
    }

    /**
     * Make sure not closing Filter modal
     */
    const target = e.target as Element;
    if (
      !target?.classList?.contains('btn--trigger-egg-filters') &&
      !target?.classList?.contains('icon-filter')
    ) {
      onCloseFilterModal();
    }
  });
  const onCloseFilterModal = useCallback(() => {
    dispatch(NFTCollectionModalActions.setFiltersConfigsModal(false));
  }, [dispatch]);

  if (!open) {
    return null;
  }

  return (
    <animated.div
      style={wrapperStyles}
      ref={ref}
      className="egg-filters--wrapper"
    >
      <button onClick={onCloseFilterModal} className="btn--close-egg-filters">
        <XLg />
      </button>
      <EggFiltersPanel />
    </animated.div>
  );
};

export default EggCollectionFilters;
