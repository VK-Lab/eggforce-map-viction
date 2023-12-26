import { useMemo, useCallback } from 'react';
import cn from 'classnames';
import {
  useAppDispatch as useDispatch,
  useAppSelector as useSelector,
} from '@/app/hooks';
import MODULES_PERMISSION from '@/constants/modulesPermission';
import Button from '@/components/GButton';
import LoadingBox from '@/components/LoadingBox';
import { NFTEggStatus } from '@/types/NFTItem';
import StatusLabel from '@/components/StatusLabel';
import GProgress from '@/components/GProgress';
import type { NFTItem } from '@/types/NFTItem';
import { calculateXPAsPercent, getNFTDetails } from '@/modules/NFTDetail/utils';
import { NFTDetailModalActions } from '@/modules/NFTDetail/store';
import { getEggDetail } from '@/modules/NFTDetail/actions';
import BoxInfo from '@/components/BoxInfo';
import { triggerEggSelectingModal } from '@/modules/EggHatching/actions';
import { generateCSSElementalClasses } from '@/helpers/nft';
import useNFTBadgeIcon from '@/hooks/useNFTBadgeIcon';
import { dragonManagementActions } from '@/modules/DragonManagementModule/store';
import { selectDragonMakeConfirmModal } from '@/modules/DragonManagementModule/selectors';
import commonMessages from '@/constants/commonMessages';
import NFTMedia from './NFTMedia';
import NFTCircle from './NFTCircle';

const GridAsEgg = ({
  data,
  isTooltipContent,
  className = '',
  onClick,
}: any) => {
  const IS_HATCHING_MODULE_ENABLED = MODULES_PERMISSION.USE_NFT_INCUBATING;
  const IS_DRAGON_HATCH_MODULE_ENABLED =
    MODULES_PERMISSION.USE_DRAGON_HATCH_MODULE;
  const dispatch = useDispatch();
  const { open: makeDragonOpenModal } = useSelector(
    selectDragonMakeConfirmModal,
  );
  const {
    egg,
    classNFT,
    tokenId,
    nftType,
    token_uri,
    material,
    level,
    brand,
    xp,
  } = getNFTDetails(data as NFTItem);
  const path = useNFTBadgeIcon({ element: classNFT?.value });
  const shouldShowActionsButton = useMemo(() => {
    // Top priority
    if (isTooltipContent) {
      return false;
    }

    /**
     * Only allow incubating when Egg has never been hatched
     * or being stopped by User
     */
    if (
      !egg ||
      (egg &&
        egg?.status !== NFTEggStatus.minting &&
        egg?.status !== NFTEggStatus.failed)
    ) {
      return true;
    }

    return false;
  }, [egg, isTooltipContent]);
  const shouldDisableActionButtons = useMemo(() => {
    return Boolean(makeDragonOpenModal || egg?.isProcessing);
  }, [egg?.isProcessing, makeDragonOpenModal]);
  const shouldRenderIncubateButton = useMemo(() => {
    return Boolean(
      IS_HATCHING_MODULE_ENABLED &&
        !egg?.isProcessing &&
        shouldShowActionsButton,
    );
  }, [IS_HATCHING_MODULE_ENABLED, egg?.isProcessing, shouldShowActionsButton]);
  const shouldRenderDragonHatchButton = useMemo(() => {
    return Boolean(
      IS_DRAGON_HATCH_MODULE_ENABLED &&
        !egg?.isProcessing &&
        shouldShowActionsButton,
    );
  }, [
    IS_DRAGON_HATCH_MODULE_ENABLED,
    egg?.isProcessing,
    shouldShowActionsButton,
  ]);

  const { exp, nextLevelXp, percent } = useMemo(() => {
    const exp = parseFloat(xp?.value ?? '0');
    const levelValue = level?.value ?? '';
    const nextLevelXp = egg?.nextLevelXp ?? 0;

    return {
      exp,
      nextLevelXp,
      percent: calculateXPAsPercent({
        exp,
        level: levelValue,
        nextLevelXp,
      }),
    };
  }, [egg, level, xp]);

  const onClickNFTHandler = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      onClick(() => dispatch(getEggDetail({ tokenId })));
    },
    [dispatch, onClick, tokenId],
  );
  const onSelectHatchingEgg = useCallback(
    (tokenId: string) => {
      dispatch(triggerEggSelectingModal({ tokenId, nftType }));
    },
    [dispatch, nftType],
  );
  const onClickStakeHandler = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      dispatch(NFTDetailModalActions.setData(data));
      onSelectHatchingEgg(String(tokenId));
    },
    [data, dispatch, onSelectHatchingEgg, tokenId],
  );
  const onConfirmEvolveToDragon = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      dispatch(NFTDetailModalActions.setData(data));
      dispatch(dragonManagementActions.showMakeConfirmModal());
    },
    [data, dispatch],
  );

  return (
    <div
      className={cn('nft-grid-item--root-2', className, {
        selected: false,
        fullHeight: true,
        'is-tooltip-content': isTooltipContent,
      })}
      onClick={onClickNFTHandler}
    >
      <div className="nft-grid-item--heading">
        <div className="custom-layout">
          <div className="validator-and-progress">
            <NFTCircle
              material={material}
              shouldShowHatchButton={shouldRenderIncubateButton}
              eggValidator={egg?.validator}
            />
            <div className="nft-grid-item--hatching-progress">
              <GProgress
                leftTopLabel={<strong>{exp} XP</strong>}
                leftLabel={
                  <strong>
                    ID: <span>#{tokenId}</span>
                  </strong>
                }
                rightLabel={
                  egg?.status && (
                    <StatusLabel
                      className="compact"
                      value={egg?.status}
                      booster={egg?.booster?.rate ?? null}
                    />
                  )
                }
                percent={percent}
                tooltipLabel={`${exp}/${nextLevelXp} XP`}
              />
            </div>
          </div>
        </div>
      </div>
      <NFTMedia nftType={nftType} media={token_uri} description={''} />

      <div className="box--metadata visible">
        {classNFT?.value && path && (
          <BoxInfo
            label="Element"
            value={
              <span className={cn(generateCSSElementalClasses(classNFT.value))}>
                <img
                  loading="lazy"
                  src={path}
                  className="icon"
                  alt={classNFT.value}
                />
                {classNFT?.value}
              </span>
            }
            valueClassName="element"
            isHorizontal={false}
          />
        )}
        {level?.value && (
          <BoxInfo
            label="Level"
            value={`${level?.value}`}
            isHorizontal={false}
          />
        )}
        {brand?.value && (
          <BoxInfo
            label="Brand"
            value={`${brand?.value}`}
            isHorizontal={false}
          />
        )}
      </div>
      <div className="nft-grid-item--body">
        {egg?.isProcessing && (
          <LoadingBox
            className="for--nft-grid-item"
            label="Processing..."
            minHeight={100}
          />
        )}
        {shouldRenderIncubateButton && (
          <Button
            disabled={shouldDisableActionButtons}
            className="btn--nft-action btn--start-hatching"
            onClick={onClickStakeHandler}
            btnStyle="5"
            size="small"
          >
            {commonMessages.labelDelegate.defaultMessage}
          </Button>
        )}
        {shouldRenderDragonHatchButton && (
          <Button
            disabled={shouldDisableActionButtons}
            className="btn--nft-action btn--start-dragon-hatch"
            onClick={onConfirmEvolveToDragon}
            btnStyle="5"
            size="small"
          >
            {commonMessages.labelDragonHatch.defaultMessage}
          </Button>
        )}
      </div>
    </div>
  );
};

export default GridAsEgg;
