import { useCallback, useMemo } from 'react';
import isFunction from 'lodash/isFunction';
import { useAppDispatch as useDispatch } from '@/app/hooks';
import type { NFTItem } from '@/types/NFTItem';
import { NFTTypeEnum } from '@/types/NFTItem';
import { NFTDetailModalActions } from '@/modules/NFTDetail/store';
import { getNFTDetails } from '@/modules/NFTDetail/utils';
import GridAsEgg from './GridAsEgg';
import GridAsDragon from './GridAsDragon';
import GridAsHammer from './GridAsHammer';
import { NFTCollectionModalActions } from '@/modules/EggCollection/store';
interface IProps {
  data?: NFTItem;
  className?: string;
  isTooltipContent?: boolean;
}

const NFTGridItem = (props: IProps) => {
  const dispatch = useDispatch();
  const { data, className, isTooltipContent = false } = props;
  const { nftType = NFTTypeEnum.EGG } = getNFTDetails(data as NFTItem);
  const { GridComponent } = useMemo(() => {
    let GridComponent;
    switch (nftType) {
      case NFTTypeEnum.DRAGON:
        GridComponent = GridAsDragon;
        break;
      case NFTTypeEnum.EGG:
        GridComponent = GridAsEgg;
        break;
      case NFTTypeEnum.HAMMER:
        GridComponent = GridAsHammer;
        break;
      default:
        break;
    }
    return {
      isHammer: nftType === NFTTypeEnum.HAMMER,
      isEggNFT: nftType === NFTTypeEnum.EGG,
      isDragonNFT: nftType === NFTTypeEnum.DRAGON,
      isDragonOrEgg: Boolean(
        nftType === NFTTypeEnum.EGG || nftType === NFTTypeEnum.DRAGON,
      ),
      GridComponent,
    };
  }, [nftType]);

  const onClickNFTHandler = useCallback(
    (callback: () => void) => {
      // Prevent opening from tooltip content
      if (isTooltipContent) {
        return;
      }

      dispatch(NFTDetailModalActions.setData(data));
      if (callback && isFunction(callback)) {
        callback();
      }
      dispatch(NFTDetailModalActions.showModal());
      dispatch(NFTCollectionModalActions.hideModal());
    },
    [isTooltipContent, dispatch, data],
  );

  if (!data || !GridComponent) {
    return null;
  }

  return (
    <GridComponent
      data={data}
      isTooltipContent={isTooltipContent}
      className={className}
      onClick={onClickNFTHandler}
    />
  );
};

export default NFTGridItem;
