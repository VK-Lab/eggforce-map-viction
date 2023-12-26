import cn from 'classnames';
import PropTypes from 'prop-types';
import { generateCSSElementalClasses } from '@/helpers/nft';
import imgBg from '@/assets/images/img--bg-unique2.png';
import type { DroppedItemSpec, EggPlaceholderState } from '@/types/EggMerge';
import EggPlaceholder from './EggPlaceholder';
interface Props {
  className?: string;
  blockClassname?: string;
  isDeploying?: boolean;

  onDrop: (slotId: number, item: DroppedItemSpec) => void;
  onRemove: (removeItemId: string) => void;
  getDroppedEgg: (id: string | undefined) => void;
  slots: EggPlaceholderState[];
}

const EggPlaceholderWrapper = ({
  className,
  blockClassname = '',
  isDeploying = false,
  onDrop,
  onRemove,
  getDroppedEgg,
  slots,
}: Props) => {
  const primaryElement = slots[0].lastDroppedItem?.classNFT ?? '';
  return (
    <div className={cn(className)}>
      <div className={cn('egg-merging-slot--root')}>
        <div
          className={cn(
            'block-unique-strength--wrapper for--merging',
            blockClassname,
            generateCSSElementalClasses(primaryElement, 'bg'),
          )}
        >
          <img
            src={imgBg}
            alt="EggForce Unique Strength"
            className="block-unique-strength--bg-art"
          />
          <div className="egg-placeholder--wrapper">
            {slots.map(({ accepts, slot, lastDroppedItem }) => (
              <EggPlaceholder
                key={`egg-placeholder--${slot}`}
                slot={slot}
                accept={accepts}
                onRemove={onRemove}
                isDeploying={isDeploying}
                lastDroppedItem={getDroppedEgg(lastDroppedItem?.tokenId)}
                onDrop={(item) => {
                  onDrop(slot, item);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

EggPlaceholderWrapper.propTypes = {
  children: PropTypes.node,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default EggPlaceholderWrapper;
