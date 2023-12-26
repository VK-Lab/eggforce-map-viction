import React, { useEffect } from 'react';
import cn from 'classnames';
import Button from '@/components/GButton';
import { NFTTypeEnum } from '@/types/NFTItem';
import imgUniqueStrengh from '@/assets/images/img--egg-claw.webp';
import imgDragon from '@/assets/images/dragon-doc 2.png';
import useCurrentUser from '@/hooks/useCurrentUser';
import MODULES_PERMISSION from '@/constants/modulesPermission';

const EggCollectionTabs = ({
  onSelectTab,
  viewMode,
  countDragons = 0,
  countEggs = 0,
  countHammers = 0,
}: {
  onSelectTab: (tabName: NFTTypeEnum) => void;
  viewMode: NFTTypeEnum;
  countDragons: number;
  countEggs: number;
  countHammers: number;
}) => {
  const user = useCurrentUser();
  useEffect(() => {
    /**
     * Switch to Egg Tab when User doesn't collect any Dragon yet
     */
    if (
      !MODULES_PERMISSION.USE_DRAGON_HATCH_MODULE ||
      (viewMode === NFTTypeEnum.DRAGON && user?.totalDragon === 0)
    ) {
      onSelectTab(NFTTypeEnum.EGG);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      {MODULES_PERMISSION.USE_DRAGON_HATCH_MODULE && (
        <Button
          onClick={() => onSelectTab(NFTTypeEnum.DRAGON)}
          className={cn('btn--as-tab', {
            active: viewMode === NFTTypeEnum.DRAGON,
            inactive: viewMode !== NFTTypeEnum.DRAGON,
          })}
        >
          <img
            loading="lazy"
            src={imgDragon}
            className="icon dragon"
            alt="Dragons"
          />
          <span>Dragons {countDragons > 0 && `(${countDragons})`}</span>
        </Button>
      )}
      <Button
        onClick={() => onSelectTab(NFTTypeEnum.EGG)}
        className={cn('btn--as-tab', {
          active: viewMode === NFTTypeEnum.EGG,
          inactive: viewMode !== NFTTypeEnum.EGG,
        })}
      >
        <img
          loading="lazy"
          src={imgUniqueStrengh}
          className="icon"
          alt="Eggs"
        />
        <span>Eggs {countEggs > 0 && `(${countEggs})`}</span>
      </Button>
    </React.Fragment>
  );
};

export default EggCollectionTabs;
