import { useCallback } from 'react';
import { Wallet2 } from 'react-bootstrap-icons';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ConnectWallet from '@/modules/CasperSigner/ConnectWallet';
import { hideConnectCSModal } from '@/modules/CasperSigner/store';
import {
  useAppDispatch as useDispatch,
  useAppSelector as useSelector,
} from '@/app/hooks';
import { selectConnectCasperSignerModal } from '@/modules/CasperSigner/selectors';
import SocialDiscordButton from '@/components/SocialDiscordButton';
import CloseModalButton from '@/components/GCloseModalButton';

const ConnectSignerModal = () => {
  const modalState = useSelector(selectConnectCasperSignerModal);
  const dispatch = useDispatch();
  const onHideHandler = useCallback(() => {
    dispatch(hideConnectCSModal());
  }, [dispatch]);
  const onClickHandler = useCallback(() => {
    onHideHandler();
  }, [onHideHandler]);

  return (
    <Offcanvas
      show={modalState.open}
      onHide={onHideHandler}
      placement={'end'}
      className="notification-sidebar--root"
    >
      <Offcanvas.Header
        closeVariant="white"
        closeButton={false}
        className="notification-sidebar--header"
      >
        <Offcanvas.Title>
          <div>
            <span>
              <Wallet2
                className="icon-wallet"
                style={{ width: 24, marginRight: 8 }}
              />
            </span>
            <span>Wallet Connector</span>
          </div>
        </Offcanvas.Title>
        <CloseModalButton className="for--off-canvas" onClick={onHideHandler} />
      </Offcanvas.Header>
      <Offcanvas.Body className="notification-sidebar--body connector-wallets">
        <p className="helper">
          Connect with one of our available wallet providers
        </p>
        <div className="body">
          <ConnectWallet onAfterClickConnect={onClickHandler} />
        </div>
        <SocialDiscordButton />
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ConnectSignerModal;
