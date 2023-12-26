import isEqual from 'lodash/isEqual';
import cn from 'classnames';
import { Heading } from '@/components/Typography';
import Button from '@/components/GButton';
import EmptyGridItems from '@/components/EmptyGridItems';
import SocialDiscordButton from '@/components/SocialDiscordButton';
import { useAppSelector as useSelector } from '@/app/hooks';
import { selectIsNFTFiltersDefault } from '@/modules/EggCollection/selectors';

const EmptyEggCollection = ({
  isMinting,
  isLoading,
  isValidating,
  reload,
}: {
  reload: () => void;
  isMinting?: boolean;
  isLoading?: boolean;
  isValidating?: boolean;
}) => {
  const isNFTFiltersDefault = useSelector(selectIsNFTFiltersDefault, isEqual);

  return (
    <div className="empty-data--wrapper">
      <EmptyGridItems />
      <div className="empty-slot--overlay"></div>
      <div className="empty-slot--body">
        <Heading h={3}>
          {isMinting ? `Minting is happening...` : `Your NFTs look empty.`}
        </Heading>
        {isMinting ? (
          <p>
            Selvyn is working on your NFT minting. <br /> Please hold on and
            come back later.
          </p>
        ) : null}
        {isNFTFiltersDefault && !isMinting && (
          <Button
            className={cn('mt-3 mb-3', {
              disabled: isValidating,
            })}
            onClick={() => {
              if (isValidating) {
                return;
              }

              reload();
            }}
            style={{ minWidth: 200, marginRight: 16 }}
            size="small"
            btnStyle="3"
          >
            {isValidating ? 'Reloading...' : 'Reload'}
          </Button>
        )}
        <SocialDiscordButton className="mt-3 mb-3" skipConfused />
      </div>
    </div>
  );
};

export default EmptyEggCollection;
