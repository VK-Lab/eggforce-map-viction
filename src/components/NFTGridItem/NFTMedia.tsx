import cn from 'classnames';
import type { NFTMetaData } from '@/types/NFTItem';
import { isGif, isVideo } from '@/helpers/utils';

const NFTMedia = ({
  media,
  description,
  isDetailView = false,
  className = '',
}: {
  media: NFTMetaData;
  nftType: string;
  description: string;
  isDetailView?: boolean;
  className?: string;
}) => {
  /**
   * TODO:
   * Fit or contain style should belong to NFT Metadata value
   * For now Hammer we should use `contain` value as it shows full image
   */
  const shouldCoverAsGif = isGif(media.value);
  const cssPrefix = isDetailView ? 'nft-detail-view' : 'nft-grid-item';

  return (
    <div className={`${cssPrefix}--media ${className}`}>
      <div className={`${cssPrefix}--background`}>
        {isVideo(media.value) ? (
          <video
            preload="none"
            className="video"
            autoPlay
            playsInline
            muted
            loop
          >
            <source src={media.value} />
          </video>
        ) : (
          <img
            loading="lazy"
            src={media.value}
            alt={description}
            className={cn('image', {
              'fit--cover': shouldCoverAsGif,
              'fit--contain': !shouldCoverAsGif,
            })}
          />
        )}
      </div>
    </div>
  );
};

export default NFTMedia;
