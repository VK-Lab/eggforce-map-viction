import { useCallback, useMemo } from 'react';
import Button from '@/components/GButton';
import useCurrentUser from '@/hooks/useCurrentUser';
import { updateAccountPermissions } from '@/modules/Auth/store';
import {
  validateWhitelistAccount,
  mintHammerProcess,
} from '@/modules/Account/actions';
import {
  useAppSelector as useSelector,
  useAppDispatch as useDispatch,
} from '@/app/hooks';
import GenericErrorModal from '@/components/GenericErrorModal';
import QuickBuyModal from '@/components/QuickBuyModal';
import { NFTCollectionModalActions } from '@/modules/EggCollection/store';
import { genericModalActions } from '@/modules/GenericErrorModal/store';
import { showConnectCSModal } from '@/modules/CasperSigner/store';
import { log } from '@/helpers/utils';
import MODULES_PERMISSION from '@/constants/modulesPermission';
import useEggMinting from './useEggMinting';
import useSigners from '@/hooks/useSigners';
import messages from '@/components/QuickBuyModal/messages';
import { packagesDetailActions } from './store';
import { selectQuickBuyModalStore } from './selectors';
import imgHatch from '@/assets/images/icon--unhatch.png';

const WorldMint = () => {
  const dispatch = useDispatch();
  const user = useCurrentUser();
  const { buy, isDeploying } = useEggMinting();
  const { open: quickBuyModalOpen } = useSelector(selectQuickBuyModalStore);
  const { signMessageAsync } = useSigners();

  // eslint-disable-next-line
  const onClaimHandler = async () => {
    if (!user?.activeKey) {
      dispatch(showConnectCSModal());
      return;
    }

    try {
      const validateResult = await dispatch(
        validateWhitelistAccount(user.activeKey),
      ).unwrap();

      // Ran out of claim slots
      if (validateResult?.remainItem <= 0) {
        dispatch(
          genericModalActions.setBody(
            messages.labelNoPermission.defaultMessage,
          ),
        );
        dispatch(genericModalActions.setModalState(true));
      }

      if (validateResult?.remainItem > 0) {
        const result: any = await dispatch(
          mintHammerProcess({
            signMessageAsync,
          }),
        ).unwrap();

        console.log(`🚀 ~ onClaimHandler ~ result:`, result);

        if (result?.status === 'success') {
          dispatch(
            updateAccountPermissions({
              key: 'hasHammer',
              value: true,
            }),
          );
          dispatch(
            NFTCollectionModalActions.setDeployHash(validateResult.deployHash),
          );
        }

        log(`🚀 ~ onClaimHandler ~ result`, result);
      }
    } catch (err: any) {
      dispatch(genericModalActions.setBody(err.message));
      dispatch(genericModalActions.setModalState(true));
      console.error(`onClaimHandler::error `, err.message);
    }
  };

  const onMintHandler = useCallback(
    async (data: any) => await buy(data),
    [buy],
  );

  const onClickMintHandler = useCallback(() => {
    if (!user?.activeKey) {
      dispatch(showConnectCSModal());
      return;
    }

    dispatch(packagesDetailActions.showQuickbuykModal());
  }, [dispatch, user]);

  const onHideQuickbuyModal = useCallback(
    () => dispatch(packagesDetailActions.hideQuickbuykModal()),
    [dispatch],
  );

  const renderPrimaryModules = useMemo(() => {
    if (MODULES_PERMISSION.USE_CLAIM_WHITELIST) {
      return (
        <Button className="btn--start-minting" onClick={onClaimHandler}>
          <span>CLAIM WHITELIST</span>
        </Button>
      );
    }

    if (MODULES_PERMISSION.USE_NFT_MINTING) {
      return (
        <Button className="btn--open-mint-modal" onClick={onClickMintHandler}>
          <img className="icon" src={imgHatch} alt="MINT EGG" />
          <span className="text-shadow">MINT EGG</span>
        </Button>
      );
    }

    return null;
  }, [onClaimHandler, onClickMintHandler]);
  return (
    <div>
      {renderPrimaryModules}
      <QuickBuyModal
        // open
        open={quickBuyModalOpen}
        className="quickbuy-modal--root"
        onMint={onMintHandler}
        onClose={onHideQuickbuyModal}
        isDeploying={isDeploying}
        onClaimHandler={onClaimHandler}
      />
      <GenericErrorModal />
    </div>
  );
};

export default WorldMint;
