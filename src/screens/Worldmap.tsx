import { useMemo, useCallback, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import isEqual from 'lodash/isEqual';
import {
  useAppSelector as useSelector,
  useAppDispatch as useDispatch,
} from '@/app/hooks';
import Navbar from 'react-bootstrap/Navbar';
import WorldMap from '@/components/WorldMap';
import MasterLayoutBody from '@/components/Layout/MasterLayoutBody';
import WorldMint from '@/modules/WorldMint';
import WorldSidebar from '@/modules/WorldSidebar';
import useCurrentUser from '@/hooks/useCurrentUser';
import WorldProfileMenu from '@/modules/WorldProfileMenu';
import ConnectSignerModal from '@/components/ConnectSignerModal';
import { NFTCollectionModalActions } from '@/modules/EggCollection/store';
import settings from '@/constants/settings';
import NotificationSidebar from '@/components/NotificationSidebar';
import { EggPurchaseStoreActions } from '@/modules/EggPurchase/store';
import { selectAuth } from '@/modules/Auth/selectors';
import useMintPermission from '@/hooks/useMintPermission';
import WorldMintMobile from '@/modules/WorldMint/WorldMintMobile';
import useDevice from '@/hooks/useDevice';
import WalletConnectors from '@/components/WalletConnectors';
import MODULES_PERMISSION from '@/constants/modulesPermission';
import EggMergingModuleModal from '@/modules/EggMerging';
import EggCollectionFilters from '@/components/EggCollectionFilters';
import WorldSecondaryMenu from '@/components/WorldSecondaryMenu';
import useAccountWallet from '@/hooks/useAccountWallet';

const WorldmapScreen = () => {
  useMintPermission();

  const hideWorldmapControllers = settings.HIDE_EGGFORCE_MAP_CONTROLLERS;
  const dispatch = useDispatch();
  const { publicKey: publicKeyUseWallet } = useAccountWallet({
    skipOnChange: true,
  });
  const storeAuth = useSelector(selectAuth, isEqual);
  const { loading } = storeAuth;
  const isDevice = useDevice();
  const user = useCurrentUser();
  const refreshNFTCollection = useCallback(() => {
    if (!user) {
      return;
    }

    dispatch(NFTCollectionModalActions.resetData());
    dispatch(EggPurchaseStoreActions.reset());
  }, [dispatch, user]);

  const renderPrimaryModules = useMemo(() => {
    return isDevice ? <WorldMintMobile /> : <WorldMint />;
  }, [isDevice]);

  const renderSignInSection = useMemo(() => {
    const DOM = (
      <div className="world-element world-element--connect-button">
        {user?.activeKey ? (
          <WorldProfileMenu user={user} />
        ) : (
          <WalletConnectors />
        )}
      </div>
    );
    if (MODULES_PERMISSION.USE_MOBILE_SUPPORT) {
      return DOM;
    }

    return !isDevice && DOM;
  }, [isDevice, user]);

  /**
   * Automatically reload user data when changing account (change key)
   */
  useEffect(() => {
    if (user && publicKeyUseWallet && user.activeKey !== publicKeyUseWallet) {
      console.log('>>> Account changed, reload NFT Collection');
      refreshNFTCollection();
    }
  }, [publicKeyUseWallet, refreshNFTCollection, user]);

  return (
    <MasterLayoutBody>
      <div className="header--worldmap">
        <Navbar.Brand as={NavLink} to="/home" className="header--worldmap-logo">
          EggForce
        </Navbar.Brand>
      </div>
      {!hideWorldmapControllers && (
        <>
          <ConnectSignerModal />
          {renderSignInSection}
          <div className="world-element world-element--secondary-menu has-menu">
            <WorldSecondaryMenu />
          </div>
          <div className="world-element world-element--sidebar has-menu">
            <WorldSidebar />
          </div>
          <div className="world-element world-element--mint-wrapper">
            {renderPrimaryModules}
          </div>
        </>
      )}
      <WorldMap />
      <NotificationSidebar />
      {loading && <div className="global--loading" />}
      <EggCollectionFilters />
      <EggMergingModuleModal />
    </MasterLayoutBody>
  );
};

export default WorldmapScreen;
