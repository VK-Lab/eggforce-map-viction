import { useEffect, useCallback } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {
  useAppDispatch as useDispatch,
  useAppSelector as useSelector,
} from '@/app/hooks';
import useCurrentUser from '@/hooks/useCurrentUser';
import { selectEggPurchaseStore } from '@/modules/EggPurchase/selectors';
import { selectNotificationModule } from '@/modules/Notifications/selectors';
import { notificationsStoreActions } from '@/modules/Notifications/store';
import { EggPurchaseStoreActions } from '@/modules/EggPurchase/store';
import {
  setDynamicLocalStorageItem,
  getDynamicLocalStorageItem,
} from '@/services/localStorage';
import NotificationItem from './NotificationItem';
import NotificationEmpty from './NotificationEmpty';
import CloseModalButton from '@/components/GCloseModalButton';

const NotificationSidebar = () => {
  const user = useCurrentUser();
  const cacheKey = user ? `deployHashesStore/${user.activeKey}` : undefined;
  const cacheDeploy = cacheKey
    ? getDynamicLocalStorageItem(cacheKey, true)
    : null;

  const dispatch = useDispatch();
  const notificationModule = useSelector(selectNotificationModule());
  const eggPurchasesStore = useSelector(selectEggPurchaseStore);
  const { deployHash } = eggPurchasesStore;
  const { open } = notificationModule;
  const onCloseNotificationSidebar = useCallback(() => {
    setDynamicLocalStorageItem(cacheKey, deployHash);
    dispatch(notificationsStoreActions.setOpenState(false));
  }, [cacheKey, deployHash, dispatch]);

  // eslint-disable-next-line
  const onClearAllDeploys = () => {
    setDynamicLocalStorageItem(cacheKey, []);
    dispatch(EggPurchaseStoreActions.reset());
  };

  useEffect(() => {
    if (deployHash?.length === 0 && cacheDeploy?.length) {
      dispatch(EggPurchaseStoreActions.loadDeployFromCacheData(cacheDeploy));
    }
  }, [cacheDeploy, deployHash, dispatch]);

  return (
    <Offcanvas
      show={open}
      onHide={onCloseNotificationSidebar}
      placement={'end'}
      className="notification-sidebar--root"
    >
      <Offcanvas.Header
        closeVariant="white"
        closeButton={false}
        className="notification-sidebar--header"
      >
        <Offcanvas.Title>Activities Center</Offcanvas.Title>
        <CloseModalButton
          className="for--off-canvas"
          onClick={onCloseNotificationSidebar}
        />
      </Offcanvas.Header>
      <Offcanvas.Body className="notification-sidebar--body">
        {/* <button onClick={onAddDeploy}>Add</button> */}
        {/* <button onClick={onClearAllDeploys}>Clear All</button> */}
        {!deployHash?.length && <NotificationEmpty />}
        <div className="notification-sidebar--content">
          {deployHash?.map((hash, index) => {
            return (
              <NotificationItem key={`deploy-hash-${index}`} hash={hash} />
            );
          })}
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default NotificationSidebar;
