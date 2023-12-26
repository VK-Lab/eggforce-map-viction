import type { FC } from 'react';
import cn from 'classnames';
import { Check2, StarFill, LockFill } from 'react-bootstrap-icons';
import React, { useMemo, memo } from 'react';
import { useDrag } from 'react-dnd';
import type { DroppedItemSpec } from '@/types/EggMerge';
import OptionItem from '@/components/OptionItem';
import { NFTEggStatus } from '@/types/NFTItem';
import Sample2 from '@/assets/images/TR-08.png';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import messages from '@/modules/EggMerging/messages';
import Popover from 'react-bootstrap/Popover';
import NFTGridItem from '@/components/NFTGridItem';
import { generateCSSElementalClasses } from '@/helpers/nft';
export interface BoxProps {
  item: any;
  type: string;
  isDropped: boolean;
  primaryElement?: DroppedItemSpec;
  isDeploying?: boolean;
}

const EggPopper = React.forwardRef(
  ({ popper, children, show: _, item, className, ...props }: any, ref) => {
    return (
      <Popover
        ref={ref}
        body
        {...props}
        className={cn('egg-popper-tooltip', className)}
      >
        <Popover.Body>
          <NFTGridItem data={item} isTooltipContent />
        </Popover.Body>
      </Popover>
    );
  },
);

export const Box: FC<BoxProps> = memo(function Box({
  primaryElement,
  item,
  type,
  isDropped,
  isDeploying = false,
}) {
  const { tokenId, egg, classNFT, isInstallment } = item;
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type,
      item: { tokenId, classNFT, isInstallment } as DroppedItemSpec,
      // canDrag: isDropped === false, // Not working
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [tokenId, type],
  );

  const isAllowedToMerge = useMemo(() => {
    if (isInstallment) {
      return false;
    }

    if (egg && (egg?.isProcessing || egg?.status === NFTEggStatus.incubating)) {
      return false;
    }

    return true;
  }, [egg, isInstallment]);

  const shouldDisabled = useMemo(() => {
    if (isDropped || isInstallment) {
      return true;
    }

    if (egg && (egg?.isProcessing || egg?.status === NFTEggStatus.incubating)) {
      return true;
    }

    if (primaryElement && primaryElement.classNFT !== classNFT) {
      return true;
    }

    return false;
  }, [classNFT, egg, isDropped, isInstallment, primaryElement]);

  return (
    <div
      ref={shouldDisabled ? null : drag}
      className="nft-grid-item nft-grid-egg"
      key={`bnpl-egg--${item.tokenId}`}
    >
      <OptionItem
        className={cn('is-egg-nft', {
          'is-invalid-status': Boolean(
            isInstallment && primaryElement?.classNFT === classNFT,
          ),
          'is-dragging': isDragging,
        })}
        thumbClassname={cn({
          ...generateCSSElementalClasses(classNFT, 'bg'),
        })}
        // text={`Egg #${item.tokenId}`}
        src={item.imageUrl ? item.imageUrl : Sample2}
        isVertical
        disabled={shouldDisabled}
        {...(!isDragging && {
          tooltip: <EggPopper item={item} />,
        })}
      />
      {isDropped && (
        <div
          className={cn('tag--icon', {
            'tag--primary-element': primaryElement?.tokenId === tokenId,
            'tag--selected': primaryElement?.tokenId !== tokenId,
          })}
        >
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip id={`tooltip-staked`}>
                {primaryElement?.tokenId === tokenId
                  ? messages.infoEggPrimaryElement.defaultMessage
                  : messages.infoEggSelected.defaultMessage}
              </Tooltip>
            }
          >
            {primaryElement?.tokenId === tokenId ? <StarFill /> : <Check2 />}
          </OverlayTrigger>
        </div>
      )}
      {!isAllowedToMerge && (
        <div className="tag--icon tag--installment">
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip id={`tooltip-staked`}>
                {messages.infoEggInHatchingOrBNPL.defaultMessage}
              </Tooltip>
            }
          >
            <LockFill />
          </OverlayTrigger>
        </div>
      )}
      <span
        className={cn('label--id', generateCSSElementalClasses(classNFT, 'bg'))}
      >
        {item.tokenId}
      </span>
    </div>
  );
});
