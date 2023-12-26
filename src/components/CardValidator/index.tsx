import React, { useCallback } from 'react';
import cn from 'classnames';
import useCurrentUser from '@/hooks/useCurrentUser';
import MiddleTruncatedText from '@/components/MiddleTruncatedText';
import Button from '@/components/GButton';
import { eggHatchingSelectActions } from '@/modules/EggHatching/store';
import { useAppDispatch as useDispatch } from '@/app/hooks';
import { NFTCollectionModalActions } from '@/modules/EggCollection/store';
import { showConnectCSModal } from '@/modules/CasperSigner/store';
import { toast, sharedToastProps } from '@/services/toast';
import MODULES_PERMISSION from '@/constants/modulesPermission';
import messages from '@/components/EggHatchSelectingModal/messages';

const CardValidator = (props: any) => {
  console.log(`🚀 ~ CardValidator ~ props:`, props);
  const IS_HATCHING_MODULE_ENABLED = MODULES_PERMISSION.USE_NFT_INCUBATING;
  const dispatch = useDispatch();
  const user = useCurrentUser();
  const {
    theme,
    background,
    validator: {
      meta,
      name,
      imageSrc,
      address,
      verified = false,
      isActiveValidator,
      isFull,
    },
  } = props;
  const onClickHatchHandler = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (!user?.activeKey) {
        dispatch(showConnectCSModal());
        return;
      }

      toast.info(messages.selectValidatorFromCard.defaultMessage, {
        ...sharedToastProps,
        toastId: messages.selectValidatorFromCard.id,
      });
      dispatch(eggHatchingSelectActions.selectValidator(address));
      dispatch(NFTCollectionModalActions.showModal());
    },
    [address, dispatch, user],
  );

  return (
    <div className={cn('card-validator--root')}>
      <div className="card-validator--image">
        <div className="card-validator--background">
          <img loading="lazy" alt={name} src={background} className="img" />
        </div>
        <div className="card-validator--bg-gradient"></div>
      </div>
      <div className="card-validator--body">
        <div
          className={cn('name-wrapper', {
            verified,
          })}
        >
          <div className="logo">
            <img loading="lazy" src={imageSrc} alt={name} />
          </div>
          <div className="name">{name}</div>
        </div>
        <div className="address">
          <MiddleTruncatedText>{address}</MiddleTruncatedText>
        </div>
        <div className="meta">{meta}</div>
      </div>
      <div
        className="card-validator--info"
        style={{
          ...(theme && {
            backgroundColor: theme,
          }),
        }}
      >
        {IS_HATCHING_MODULE_ENABLED && isActiveValidator && (
          <div className="card-validator--hatch-button">
            <Button
              disabled={isFull}
              onClick={onClickHatchHandler}
              size="small"
              className="btn--stake-from-validator"
              btnStyle={isFull ? '3' : '1'}
            >
              {isFull ? 'OUT OF ORDER' : 'START INCUBATING'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardValidator;
