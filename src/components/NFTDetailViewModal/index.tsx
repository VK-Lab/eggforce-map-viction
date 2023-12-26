import React, { useState, useMemo, useCallback } from 'react';
import cn from 'classnames';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import isEmpty from 'lodash/isEmpty';
import type { NFTItem } from '@/types/NFTItem';
import { toast, sharedToastProps } from '@/services/toast';
import { NFTTypeEnum } from '@/types/NFTItem';
import MODULES_PERMISSION from '@/constants/modulesPermission';
import LoadingBox from '@/components/LoadingBox';
import Button from '@/components/GButton';
import {
  useAppDispatch as useDispatch,
  useAppSelector as useSelector,
} from '@/app/hooks';
import GModal from '@/components/GModal';
import { selectNFTDetailModal } from '@/modules/NFTDetail/selectors';
import { NFTDetailModalActions } from '@/modules/NFTDetail/store';
import NFTMedia from '@/components/NFTGridItem/NFTMedia';
import NFTTitle from '@/components/NFTGridItem/NFTTitle';
import {
  triggerEggSelectingModal,
  stopEggHatchingProcess,
  claimSNCProcess,
} from '@/modules/EggHatching/actions';
import useEggHatching from '@/hooks/useEggHatching';
import useCheckBalance from '@/hooks/useCheckBalance';
import NFTUniqueStrength from '@/components/NFTUniqueStrength';
import TabBasicInfo from './TabBasicInfo';
import TabHatching from './TabHatching';
import HelperHatch from './HelperHatch';
import ActionButtons from './ActionButtons';
import ConfirmClaimSNCModal from './ConfirmClaimSNCModal';
import ConfirmUnhatchModal from './ConfirmUnhatchModal';
import { MIN_SNC_INCREMENT_TO_CLAIM } from '@/constants/key';
import { selectEggHatchingModalLoading } from '@/modules/EggHatching/selectors';
import { eggHatchingSelectActions } from '@/modules/EggHatching/store';
import { getNFTDetails } from '@/modules/NFTDetail/utils';
import { lockAndReloadEggDetail } from '@/modules/NFTDetail/actions';
import { handleDeployResult } from '@/modules/EggPurchase/actions';
import { dragonManagementActions } from '@/modules/DragonManagementModule/store';
import InfoProcessingPanel from '@/components/InfoProcessingPanel';
import CloseModalButton from '@/components/GCloseModalButton';
import useSiteConfigurations from '@/hooks/useSiteConfigurations';
import { moteToCspr } from '@/helpers/balance';
import { NFTCollectionModalActions } from '@/modules/EggCollection/store';
import OptionItem from '@/components/OptionItem';
import Sample2 from '@/assets/images/TR-08.png';
import NFTBadgeElement from './NFTBadgeElement';
import NFTMetadataBox from './NFTMetadataBox';
import NFTProgressBar from './NFTProgressBar';
import NFTStats from './NFTStats';
import messages from './messages';
import NFTDragonStats from './NFTDragonStats';
import DragonAttributes from './DragonAttributes';
import { Heading } from '../Typography';
import TabDragonDetails from './TabDragonDetails';
import { reloadCurrentUser } from '@/modules/Auth/actions';
import useCurrentUser from '@/hooks/useCurrentUser';
interface INFTDetailViewModal {
  onClose?: () => void;
  open?: boolean;
  onHide?: () => void;
}

export const UNHATCH_TYPES = {
  UNHATCH_ONLY: 'UNHATCH_ONLY',
  UNHATCH_AND_UNDELEGATE: 'UNHATCH_AND_UNDELEGATE',
};

const NFTDetailViewModal = (props: INFTDetailViewModal) => {
  const user = useCurrentUser();
  const IS_HATCHING_MODULE_ENABLED = MODULES_PERMISSION.USE_NFT_INCUBATING;
  const minSNCClaimable = MIN_SNC_INCREMENT_TO_CLAIM;
  const { claim, undelegate } = useEggHatching();
  const [isTraitVisible, setTraitsVisible] = useState<boolean>(true);
  const siteConfiguration = useSiteConfigurations();
  const dispatch = useDispatch();
  const { checkBalanceAgainstAmount } = useCheckBalance();
  const NFTDetailStore = useSelector(selectNFTDetailModal);
  const isEggActionLoading = useSelector(selectEggHatchingModalLoading);
  const [showConfirmModal, setConfirmModalState] = useState<boolean>(false);
  const [showClaimConfirmModal, setClaimConfirmModalState] =
    useState<boolean>(false);
  const [unhatchType, setUnhatchType] = useState<string>(
    UNHATCH_TYPES.UNHATCH_AND_UNDELEGATE,
  );
  const shouldUndelegate = useMemo(
    () => Boolean(unhatchType === UNHATCH_TYPES.UNHATCH_AND_UNDELEGATE),
    [unhatchType],
  );
  const { open, data, loading } = NFTDetailStore;

  const {
    egg,
    contractName,
    contractAddress,
    creator,
    tokenId,
    symbol,
    nftType,
    name,
    description,
    image,
    token_uri,
    level,
    classNFT,
    xp,
    material,
    yearOfCreation,
    brand,
    isInstallment,
    installmentId,
    dna,
    rarity,
    date,
    edition,
    attributes,
    origin,
  } = getNFTDetails(data as NFTItem);
  const { isEggNFT, isDragonNFT } = useMemo(() => {
    return {
      isHammer: nftType === NFTTypeEnum.HAMMER,
      isEggNFT: nftType === NFTTypeEnum.EGG,
      isDragonNFT: nftType === NFTTypeEnum.DRAGON,
      isDragonOrEgg: Boolean(
        nftType === NFTTypeEnum.EGG || nftType === NFTTypeEnum.DRAGON,
      ),
    };
  }, [nftType]);
  console.log(
    `🚀 ~ const{isEggNFT,isDragonNFT}=useMemo ~ isEggNFT:`,
    egg,
    isEggNFT,
  );
  const onHideHandler = useCallback(() => {
    dispatch(NFTDetailModalActions.hideModal());
    dispatch(NFTCollectionModalActions.showModal());
  }, [dispatch]);

  const onShowConfirmModalHandler = useCallback(() => {
    setConfirmModalState(true);
  }, []);
  const onHideConfirmModalHandler = useCallback(() => {
    setConfirmModalState(false);
    setUnhatchType(UNHATCH_TYPES.UNHATCH_AND_UNDELEGATE);
    dispatch(eggHatchingSelectActions.setLoading(false));
  }, [dispatch]);

  const onShowConfirmSNCClaimModal = useCallback(() => {
    if (egg && egg?.accumulatedSnc < minSNCClaimable) {
      toast.warn(messages.claimSNCNotEnoughSNC.defaultMessage, {
        ...sharedToastProps,
        autoClose: true,
      });
      return;
    }

    // Prevent claiming when not enough balance
    if (!checkBalanceAgainstAmount(0)) {
      toast.warn(
        messages.claimSNCNotEnoughCSPR(
          moteToCspr(siteConfiguration.UPDATE_METADATA_FEE!).toString(),
        ).defaultMessage,
        {
          ...sharedToastProps,
          autoClose: true,
        },
      );
      return;
    }

    dispatch(reloadCurrentUser(user.activeKey));
    setClaimConfirmModalState(true);
  }, [
    checkBalanceAgainstAmount,
    dispatch,
    egg,
    minSNCClaimable,
    siteConfiguration.UPDATE_METADATA_FEE,
    user.activeKey,
  ]);
  const onHideConfirmSNCClaimModal = useCallback(() => {
    dispatch(eggHatchingSelectActions.setLoading(false));
    setClaimConfirmModalState(false);
  }, [dispatch]);

  const onTriggerHatchingHandler = useCallback(() => {
    dispatch(
      triggerEggSelectingModal({
        tokenId: String(tokenId),
        nftType,
      }),
    );
  }, [dispatch, nftType, tokenId]);

  const onClaimSNCHandler = useCallback(
    async (claimAmount: number) => {
      try {
        dispatch(eggHatchingSelectActions.setLoading(true));
        const result: any = await dispatch(
          claimSNCProcess({
            tokenId,
            claim,
            claimAmount,
          }),
        ).unwrap();

        if (result) {
          await dispatch(
            handleDeployResult({
              result: result?.deployResult,
              message: `SNC Claiming request for token ${tokenId} is sent`,
              toastId: `snc-claiming-${tokenId}`,
              metadata: {
                from: 'nftDetail',
                id: tokenId,
                action: 'claim',
              },
              onCompleted: () => {
                dispatch(lockAndReloadEggDetail({ tokenId }));
              },
            }),
          );
        }
      } catch (err: any) {
        toast.warn(messages.claimSNCFailed.defaultMessage, {
          ...sharedToastProps,
        });
      } finally {
        onHideConfirmSNCClaimModal();
      }
    },
    [claim, dispatch, onHideConfirmSNCClaimModal, tokenId],
  );

  const onConfirmStopHatching = useCallback(async () => {
    try {
      dispatch(eggHatchingSelectActions.setLoading(true));
      const result: any = await dispatch(
        stopEggHatchingProcess({
          tokenId,
          shouldUndelegate,
          undelegate,
          claim,
        }),
      ).unwrap();

      if (result) {
        await dispatch(
          handleDeployResult({
            result: result?.deployResult,
            message: `Stop incubating process for token ${tokenId} is sent`,
            toastId: `Stop-incubating-${tokenId}`,
            metadata: {
              from: 'nftDetail',
              id: tokenId,
              action: 'undelegate',
            },
            configs: {
              skipStoringDeploy:
                !shouldUndelegate || isEmpty(result?.deployResult),
            },
            onCompleted: () => {
              dispatch(lockAndReloadEggDetail({ tokenId }));
            },
          }),
        );

        return result;
      }
    } catch (err: any) {
      console.log(`🚀 ~ onConfirmStopHatching ~ err:`, err.message);
      toast.warn(messages.unhatchFailed.defaultMessage, {
        ...sharedToastProps,
        autoClose: true,
      });
    } finally {
      onHideConfirmModalHandler();
    }
  }, [
    claim,
    dispatch,
    onHideConfirmModalHandler,
    shouldUndelegate,
    tokenId,
    undelegate,
  ]);
  const onUndelegateCheckboxChange = useCallback((newValue: boolean) => {
    if (newValue === true) {
      setUnhatchType(UNHATCH_TYPES.UNHATCH_AND_UNDELEGATE);
    } else {
      setUnhatchType(UNHATCH_TYPES.UNHATCH_ONLY);
    }
  }, []);

  const onConfirmEvolveToDragon = useCallback(() => {
    dispatch(dragonManagementActions.showMakeConfirmModal());
  }, [dispatch]);

  return (
    <GModal
      onHide={onHideHandler}
      backdrop="static"
      keyboard={true}
      closeButton={false}
      show={open}
      className={`nft-detail-view-modal`}
    >
      <div className={cn('nft-detail-view--box-wrapper')}>
        {loading && (
          <div className="nft-detail-view--overlay">
            <LoadingBox />
          </div>
        )}
        <div className="nft-detail-view--close">
          <CloseModalButton
            className="nft-detail-view--close-button"
            onClick={onHideHandler}
          />
        </div>
        <div className="nft-detail-view--box">
          {!isEmpty(classNFT) && <NFTBadgeElement element={classNFT.value} />}

          {egg?.isProcessing && (
            <InfoProcessingPanel
              message={messages.eggProcessingTip.defaultMessage}
            />
          )}
          <div
            className={cn('body', {
              'egg-is-processing': egg?.isProcessing,
            })}
          >
            <div className="metadata-wrapper">
              <NFTTitle
                isDetailView
                nftType={nftType}
                contractAddress={contractAddress}
                contractName={contractName}
                name={name}
                tokenId={String(tokenId)}
                creator={creator}
                status={egg?.status ?? ''}
                booster={egg?.booster ?? null}
              />
              {isDragonNFT && (
                <NFTDragonStats
                  data={{
                    classNFT: classNFT?.value ?? '',
                    rarity: rarity?.value,
                    bod: new Date(date?.value).toDateString(),
                    dna: dna?.value,
                  }}
                />
              )}
              {isEggNFT && (
                <NFTStats
                  data={{
                    level: !isEmpty(level) ? level.value : 'Rock',
                    pointSNC: egg?.accumulatedSnc ?? 0,
                    // pointXP: formatXPValue(xp?.value ?? '0'),
                    pointXP: xp?.value ?? '0',
                    stakedAmount: egg?.stakedAmount ?? 0,
                    booster: egg?.booster ?? null,
                  }}
                />
              )}
              <div
                className={cn('image-wrapper', {
                  'is--dragon': isDragonNFT,
                  'no--original-egg': isDragonNFT && !origin?.value,
                })}
              >
                <NFTUniqueStrength
                  skipText
                  forHatching
                  backgroundElement={classNFT?.value ?? ''}
                  element={classNFT?.value ?? ''}
                  blockClassname={cn(`for--nft-detail-view`, {
                    'for-cardview': isDragonNFT,
                    'no--original-egg': isDragonNFT && !origin?.value,
                    [`is--${nftType?.toLowerCase()}`]: nftType,
                  })}
                  className={cn({
                    'dragon--traits-view': isDragonNFT,
                    'dragon--show-traits': isDragonNFT && isTraitVisible,
                    'dragon--hide-traits': isDragonNFT && !isTraitVisible,
                  })}
                  hasPulseAnimation={!isDragonNFT}
                  hasRotateAnimationBg={!isDragonNFT}
                  hasElementalBackground={isEggNFT}
                  renderMedia={
                    <React.Fragment>
                      <NFTMedia
                        isDetailView
                        className={cn('for--hatching', {
                          [`is--${nftType?.toLowerCase()}`]: true,
                        })}
                        nftType={nftType}
                        media={
                          isEggNFT
                            ? token_uri
                            : {
                                ...image,
                                value: image?.value?.toLowerCase(),
                              }
                        }
                        description={isEggNFT ? '' : description.value}
                      />
                      {isDragonNFT && (
                        <div className="nft-detail-dragon-attributes">
                          <DragonAttributes
                            show={isTraitVisible}
                            traits={attributes?.value ?? []}
                          />
                        </div>
                      )}
                    </React.Fragment>
                  }
                />
                {isDragonNFT && origin?.value && (
                  <div
                    className={cn('dragon--original-egg', {
                      'dragon--hide-traits': !isTraitVisible,
                    })}
                    style={{ textAlign: 'center' }}
                  >
                    <Heading h={5}>Original Egg</Heading>
                    <OptionItem
                      className="is-egg-nft"
                      text={`Egg #${origin.value}`}
                      src={data?.originalEgg?.uri ?? Sample2}
                      isVertical
                    />
                  </div>
                )}
                {isDragonNFT && (
                  <div
                    className={cn('dragon--footer-section', {
                      'should--move-offset': Boolean(
                        !origin?.value && !isTraitVisible,
                      ),
                    })}
                  >
                    <Button
                      btnStyle="1"
                      size="xsmall"
                      className="button--toggle-dragon-traits"
                      onClick={() => setTraitsVisible(!isTraitVisible)}
                    >
                      {isTraitVisible
                        ? 'Hide Dragon Traits'
                        : 'Show Dragon Traits'}
                    </Button>
                  </div>
                )}
                <div className="nft-detail-metadata-column left">
                  {!isEmpty(material) && nftType === NFTTypeEnum.HAMMER && (
                    <NFTMetadataBox className="item-1" label="Material">
                      {material.value}
                    </NFTMetadataBox>
                  )}
                  {!isEmpty(yearOfCreation) &&
                    nftType === NFTTypeEnum.HAMMER && (
                      <NFTMetadataBox className="item-1" label="Creation Year">
                        {yearOfCreation.value}
                      </NFTMetadataBox>
                    )}
                  {!isEmpty(brand) && (
                    <NFTMetadataBox className="item-1" label="Brand">
                      {brand?.value}
                    </NFTMetadataBox>
                  )}
                </div>
                {/* <div className="nft-detail-metadata-column right">
                  <NFTMetadataBox
                    className="item-1 unhatch-desktop-button"
                    label=""
                  >
                    <Button
                      className="inside-nft-detail btn--nft-action btn--stop-hatching desktop"
                      onClick={onShowConfirmModalHandler}
                      btnStyle="6"
                      size="small"
                    >
                      <img
                        className="icon icon--unhatch"
                        src={iconUnhatch}
                        alt={commonMessages.labelUndelegate.defaultMessage}
                      />
                      <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip id="tooltip--stop-incubating-egg">
                            Stop incubating your Egg. This will unstake your
                            CSPR and you will stop earning any rewards (CSPR and
                            SNC).
                          </Tooltip>
                        }
                      >
                        <span className="text-shadow">
                          {commonMessages.labelUndelegate.defaultMessage}
                        </span>
                      </OverlayTrigger>
                    </Button>
                  </NFTMetadataBox>
                </div> */}
                {/* {egg && (
                  <div className="nft-detail-metadata-column right">
                    {egg?.luckyPoint > 0 && (
                      <NFTMetadataBox
                        className="item-1"
                        valueClassname="lucky-point"
                        label="Lucky Point"
                      >
                        <div className="cspr-amount">{egg?.luckyPoint}%</div>
                      </NFTMetadataBox>
                    )}
                    {isEggNFT && egg?.status === NFTEggStatus.incubating && (
                      <NFTMetadataBox
                        className="item-1 unhatch-desktop-button"
                        label=""
                      >
                        <Button
                          disabled={
                            isEmpty(egg) ||
                            egg?.isProcessing ||
                            egg?.stakedAmount === 0 ||
                            egg?.status === NFTEggStatus.stopped
                          }
                          className="inside-nft-detail btn--nft-action btn--stop-hatching desktop"
                          onClick={onShowConfirmModalHandler}
                          btnStyle="6"
                          size="small"
                        >
                          <img
                            className="icon icon--unhatch"
                            src={iconUnhatch}
                            alt={commonMessages.labelUndelegate.defaultMessage}
                          />
                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip id="tooltip--stop-incubating-egg">
                                Stop incubating your Egg. This will unstake your
                                CSPR and you will stop earning any rewards (CSPR
                                and SNC).
                              </Tooltip>
                            }
                          >
                            <span className="text-shadow">
                              {commonMessages.labelUndelegate.defaultMessage}
                            </span>
                          </OverlayTrigger>
                        </Button>
                      </NFTMetadataBox>
                    )}
                  </div>
                )} */}
              </div>
              {IS_HATCHING_MODULE_ENABLED && isEggNFT && (
                <React.Fragment>
                  <NFTProgressBar
                    data={{
                      element: classNFT.value,
                      exp: xp?.value ?? 0,
                      nextLevelXp: egg?.nextLevelXp ?? 0,
                      level: level?.value,
                      validator: egg?.validator ?? null,
                    }}
                  />
                  <div
                    className={cn('nft-actions-row', {
                      'has-2-buttons':
                        !MODULES_PERMISSION.USE_DRAGON_HATCH_MODULE,
                    })}
                  >
                    <ActionButtons
                      egg={egg}
                      onHatch={onTriggerHatchingHandler}
                      onClaim={onShowConfirmSNCClaimModal}
                      onConfirmUnhatch={onShowConfirmModalHandler}
                      onConfirmEvolveToDragon={onConfirmEvolveToDragon}
                      isInstallment={isInstallment}
                    />
                    <HelperHatch />
                  </div>
                </React.Fragment>
              )}
              <div className="nft-detail-view--tabs-wrapper">
                <Tabs
                  defaultActiveKey={
                    isDragonNFT
                      ? 'dragonStats'
                      : IS_HATCHING_MODULE_ENABLED && egg
                      ? 'incubating'
                      : 'basic-info'
                  }
                  className="mb-3"
                  id="uncontrolled-tab-example"
                >
                  {isDragonNFT && (
                    <Tab eventKey="dragonStats" title="Dragon Information">
                      <TabDragonDetails
                        tokenId={tokenId}
                        elemental={classNFT?.value ?? ''}
                        rarity={rarity?.value}
                        bod={new Date(date?.value).toDateString()}
                        dna={dna?.value}
                        edition={edition?.value}
                        attributes={attributes?.value ?? []}
                      />
                    </Tab>
                  )}
                  {IS_HATCHING_MODULE_ENABLED && egg && (
                    <Tab eventKey="incubating" title="Incubation Details">
                      <TabHatching
                        egg={egg}
                        eggId={tokenId}
                        exp={xp?.value ?? 0}
                        nextLevelXp={egg?.nextLevelXp ?? 0}
                        level={level?.value}
                        onClaim={onShowConfirmSNCClaimModal}
                      />
                    </Tab>
                  )}
                  <Tab eventKey="basic-info" title="NFT Information">
                    <TabBasicInfo
                      data={{
                        isDragonNFT,
                        element: classNFT?.value ?? undefined,
                        egg,
                        tokenId,
                        symbol,
                        contractName,
                        contractAddress,
                        isInstallment,
                        installmentId,
                        edition: edition?.value,
                        rarity: rarity?.value,
                        dob: new Date(date?.value).toDateString(),
                        dna: dna?.value,
                      }}
                    />
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ConfirmUnhatchModal
        open={showConfirmModal}
        onHide={onHideConfirmModalHandler}
        onConfirm={onConfirmStopHatching}
        shouldUndelegate={shouldUndelegate}
        onCheckboxChange={onUndelegateCheckboxChange}
        disableConfirm={isEggActionLoading}
      />
      <ConfirmClaimSNCModal
        open={showClaimConfirmModal}
        amount={egg?.snc ?? 0}
        onHide={onHideConfirmSNCClaimModal}
        onConfirm={onClaimSNCHandler}
        disableConfirm={isEggActionLoading}
      />
    </GModal>
  );
};

export default NFTDetailViewModal;
