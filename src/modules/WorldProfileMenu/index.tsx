import React, { useEffect, useCallback } from 'react';
import cn from 'classnames';
import Dropdown from 'react-bootstrap/Dropdown';
import isEmpty from 'lodash/isEmpty';
import { usePrevious, useCopyToClipboard } from 'react-use';
import { toast, sharedToastProps } from '@/services/toast';
import { BellFill, ClipboardData, BoxArrowRight } from 'react-bootstrap-icons';
import {
  useAppSelector,
  useAppDispatch as useDispatch,
  useAppSelector as useSelector,
} from '@/app/hooks';
import type { UserType } from '@/modules/Auth/store';
import MiddleTruncatedText from '@/components/MiddleTruncatedText';
import { disconnectCasperSigner } from '@/modules/Auth/actions';
import BalanceChip from '@/components/BalanceChip';
import CSPRExplorerButton from '@/components/CSPRExplorerButton';
import { selectEggPurchaseStore } from '@/modules/EggPurchase/selectors';
import { notificationsStoreActions } from '@/modules/Notifications/store';
import { useDisconnect } from 'wagmi';
import { useAudio } from 'react-use';
import type { DeployItem } from '@/types/deploy';
import { DeployStatus } from '@/types/deploy';
import useNFTBadgeIcon from '@/hooks/useNFTBadgeIcon';
import AccountNFTHeader from '@/components/AccountINFTHeader';
import ProfileBadge from '@/components/ProfileBadge';
import { selectConnectionType } from '@/modules/Auth/selectors';
import isEqual from 'lodash/isEqual';
import WalletConnectors from '@/services/WalletConnectors';
import type { WalletConnectorType } from '@/services/WalletConnectors';
import { isDeployTooOld } from '@/helpers/deploy';
import useDevice from '@/hooks/useDevice';
interface IProps {
  user: UserType;
}

const getDeployUpdateText = (deploy: DeployItem) => {
  if (deploy.metadata && !isEmpty(deploy.metadata)) {
    const {
      metadata: { id, action },
    } = deploy;

    return `Updated ${action} result for ID #${id}`;
  }

  return 'Deploy is updated';
};

const WorldProfileMenu = (props: IProps) => {
  const { user } = props;
  const isDevice = useDevice();
  const disableBadge = true;
  const currentWalletConnection = useAppSelector(selectConnectionType, isEqual);
  const walletInstance = currentWalletConnection
    ? (WalletConnectors.from(currentWalletConnection) as WalletConnectorType)
    : undefined;
  // eslint-disable-next-line
  const [audio, __, controls, ___] = useAudio({
    src: `${process.env.PUBLIC_URL}/sound-done.mp3`,
    autoPlay: true,
  });
  const { disconnectAsync } = useDisconnect({
    onSuccess: () => {
      dispatch(disconnectCasperSigner());
    },
  });
  const dispatch = useDispatch();
  const imageElement = useNFTBadgeIcon({
    isBackground: true,
    element: 'Earth',
  });
  const eggPurchasesStore = useSelector(selectEggPurchaseStore);
  const { deployHash } = eggPurchasesStore;
  const latestDeploy = deployHash.at(0) ?? undefined;
  const prevDeployStatus = usePrevious(latestDeploy?.status ?? undefined);

  // eslint-disable-next-line
  const [_, copyToClipboard] = useCopyToClipboard();
  const onDisconnectWallet = useCallback(async () => {
    await disconnectAsync();
  }, [disconnectAsync]);
  const onCopyHandler = useCallback(
    (evt: React.MouseEvent<HTMLButtonElement>) => {
      evt.preventDefault();
      evt.stopPropagation();
      copyToClipboard(user.activeKey);
      toast.success('Key copied');
    },
    [copyToClipboard, user],
  );

  const onOpenNotificationSidebar = useCallback(
    () => dispatch(notificationsStoreActions.setOpenState(true)),
    [dispatch],
  );

  /**
   * This will toast when the latest status is changed
   */
  useEffect(() => {
    if (!latestDeploy) {
      return;
    }
    if (
      prevDeployStatus &&
      latestDeploy.status !== DeployStatus.PENDING &&
      latestDeploy.status !== prevDeployStatus
    ) {
      const message = getDeployUpdateText(latestDeploy);
      if (!isDeployTooOld(latestDeploy.createdAt)) {
        // Play sound
        controls.play();
        // Toast updated deploy
        toast.info(message, {
          ...sharedToastProps,
          toastId: latestDeploy.hash,
          autoClose: 6000,
        });
      }
    }
  }, [controls, latestDeploy, prevDeployStatus]);

  /**
   * Change Profile status based on whether CS is still active or not
   */

  if (!user) {
    return null;
  }

  return (
    <div className="profile-avatar--container">
      {audio}
      <div className="profile-avatar--submenu">
        {!isDevice && <AccountNFTHeader />}
        <div className="profile-avatar--balance-and-notifications">
          <button
            className="notification-sidebar--btn-trigger btn--notification-trigger"
            onClick={onOpenNotificationSidebar}
          >
            <BellFill />
          </button>
          <BalanceChip showBalanceToggler balance={user.balance} />
        </div>
      </div>
      <Dropdown className="profile-avatar--dropdown-root">
        <Dropdown.Toggle as="div" className="profile-avatar--dropdown-toggle">
          <ProfileBadge
            disableBadge={disableBadge}
            imageElement={imageElement}
            className={cn('profile-avatar--wrapper', {
              'is--locked': !user.activeKey,
              'is--unlocked': user.activeKey,
              'is--default': true,
            })}
            primaryImageClassName="profile-avatar--image"
          />
        </Dropdown.Toggle>
        <Dropdown.Menu className="profile-avatar--dropdown-menu">
          {currentWalletConnection && walletInstance && (
            <Dropdown.Item className="profile-avatar--dropdown-item wallet-name">
              <span className="icon wallet">
                <img
                  className="img-wallet"
                  src={walletInstance.iconURL}
                  alt={walletInstance.name}
                />
              </span>
              <span>{`${walletInstance.name} connected`}</span>
            </Dropdown.Item>
          )}
          <Dropdown.Item
            onClick={onCopyHandler}
            className="profile-avatar--dropdown-item publicKey"
            as="button"
            title="Click to copy"
          >
            <span className="icon">
              <ClipboardData />
            </span>
            <MiddleTruncatedText placement="bottom">
              {user.activeKey}
            </MiddleTruncatedText>
          </Dropdown.Item>
          <Dropdown.Item
            onClick={onDisconnectWallet}
            className="profile-avatar--dropdown-item disconnect"
            as="button"
          >
            <span className="icon">
              <BoxArrowRight />
            </span>
            <span>Disconnect Wallet</span>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      {latestDeploy?.hash && (
        <CSPRExplorerButton
          className="profile-bar"
          hash={latestDeploy?.hash}
          label={false}
          status={latestDeploy?.status}
        />
      )}
    </div>
  );
};

export default WorldProfileMenu;
