import cn from 'classnames';
import type { FC } from 'react';
import React, { memo } from 'react';
import { XCircleFill } from 'react-bootstrap-icons';
import { useDrop } from 'react-dnd';
import { generateCSSElementalClasses } from '@/helpers/nft';
import OptionItem from '@/components/OptionItem';
import Sample2 from '@/assets/images/TR-08.png';

export interface EggPlaceholderProps {
  accept: string[];
  lastDroppedItem?: any;
  onDrop: (item: any) => void;
  onRemove: (item: any) => void;
  slot: number;
  isDeploying: boolean;
}

const EggPlaceholder: FC<EggPlaceholderProps> = memo(function EggPlaceholder({
  accept,
  lastDroppedItem,
  onDrop,
  onRemove,
  isDeploying,
  slot,
}) {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept,
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = isOver && canDrop;

  return (
    <div
      ref={drop}
      className={cn(`egg-placeholder--box slot-${slot}`, {
        'no-dash': lastDroppedItem,
      })}
    >
      <div className="nft-grid-egg active egg-placeholder--box-option--wrapper">
        {isActive && <div className="egg-placeholder--box-release-hint"></div>}

        {lastDroppedItem ? (
          <React.Fragment>
            <OptionItem
              className="is-egg-nft on-placeholder"
              src={
                lastDroppedItem.imageUrl ? lastDroppedItem.imageUrl : Sample2
              }
              thumbClassname={cn(
                generateCSSElementalClasses(lastDroppedItem.classNFT),
              )}
              isVertical
            />
            {!isDeploying && (
              <button
                className="egg-placeholder--box-remove"
                onClick={() => onRemove(lastDroppedItem.tokenId)}
              >
                <XCircleFill />
              </button>
            )}
            <span
              className={cn(
                'egg-placeholder--box-id label--id',
                generateCSSElementalClasses(lastDroppedItem.classNFT, 'bg'),
              )}
            >
              {lastDroppedItem.tokenId}
            </span>
          </React.Fragment>
        ) : (
          slot === 1 && <React.Fragment />
        )}
      </div>
    </div>
  );
});

export default EggPlaceholder;
