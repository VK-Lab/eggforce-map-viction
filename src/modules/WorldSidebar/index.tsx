import React, { useCallback } from 'react';
import MODULES_PERMISSION from '@/constants/modulesPermission';
import Button from '@/components/GButton';
import EggCollectionModal from '@/modules/EggCollection';
import { NFTCollectionModalActions } from '@/modules/EggCollection/store';
import { selectNFTCollectionModal } from '@/modules/EggCollection/selectors';
import { showConnectCSModal } from '@/modules/CasperSigner/store';
import useCurrentUser from '@/hooks/useCurrentUser';
import NFTDetailViewModal from '@/components/NFTDetailViewModal';
import { selectNFTDetailModal } from '@/modules/NFTDetail/selectors';
import {
  useAppSelector as useSelector,
  useAppDispatch as useDispatch,
} from '@/app/hooks';
import useDevice from '@/hooks/useDevice';
import iconHatch from '@/assets/images/icon--hatch.png';
import EggHatchSelectingModal from '@/components/EggHatchSelectingModal';
import EggEvolveDragonConfirmModal from '@/components/EggEvolveToDragonModal';

const WorldSidebar = () => {
  const dispatch = useDispatch();
  const user = useCurrentUser();
  const isDevice = useDevice();
  const isMobileSupport = MODULES_PERMISSION.USE_MOBILE_SUPPORT;
  const nftCollectionModalState = useSelector(selectNFTCollectionModal);
  const NFTDetailStore = useSelector(selectNFTDetailModal);
  const { open: showModal } = nftCollectionModalState;
  const { data: NFTDetail, open: showNFTDetailModal } = NFTDetailStore;
  const onViewNFTCollection = useCallback(() => {
    if (!user?.activeKey) {
      dispatch(showConnectCSModal());
      return;
    }

    dispatch(NFTCollectionModalActions.showModal());
  }, [dispatch, user]);

  return (
    <div className="map-sidebar--root">
      <div className="buttons">
        {((!isMobileSupport && !isDevice) || isMobileSupport) && (
          <React.Fragment>
            <Button
              ignoreShadowStyle
              tooltip="View NFT Collection"
              className="btn--icon large use--elemental-background btn--view-collection"
              onClick={onViewNFTCollection}
            >
              <img
                style={{ width: 56 }}
                src={iconHatch}
                alt="View NFT Collection"
              />
              <span className="label">NFT Collection</span>
            </Button>
          </React.Fragment>
        )}
      </div>
      <EggCollectionModal open={showModal} />
      {showNFTDetailModal && NFTDetail && <NFTDetailViewModal />}
      <EggHatchSelectingModal />
      <EggEvolveDragonConfirmModal />
    </div>
  );
};

export default WorldSidebar;
