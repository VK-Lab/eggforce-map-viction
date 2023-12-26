import { useCallback } from 'react';
import isEqual from 'lodash/isEqual';
import GModal from '@/components/GModal';
import EggCollection from './EggCollection';
import { NFTCollectionModalActions } from '@/modules/EggCollection/store';
import {
  useAppSelector as useSelector,
  useAppDispatch as useDispatch,
} from '@/app/hooks';
import { toast, sharedToastProps } from '@/services/toast';
import { selectEggHatchingModal } from '@/modules/EggHatching/selectors';
import { eggHatchingSelectActions } from '@/modules/EggHatching/store';
import messages from '@/components/EggHatchSelectingModal/messages';
import { selectIsNFTFiltersDefault } from '@/modules/EggCollection/selectors';

interface IProps {
  open: boolean;
}

const EggCollectionModal = ({ open }: IProps) => {
  const dispatch = useDispatch();
  const eggHatchSelectModal = useSelector(selectEggHatchingModal);
  const isNFTFiltersDefault = useSelector(selectIsNFTFiltersDefault, isEqual);
  const { selectedValidator } = eggHatchSelectModal;

  const onClose = useCallback(() => {
    dispatch(NFTCollectionModalActions.hideModal());
    dispatch(
      NFTCollectionModalActions.resetPagination({
        resetLimit: false,
      }),
    );

    if (!isNFTFiltersDefault) {
      dispatch(NFTCollectionModalActions.resetFiltersConfigs());
    }

    // Clear selected validator from Card
    if (selectedValidator) {
      toast.info(messages.clearSelectValidatorFromCard.defaultMessage, {
        ...sharedToastProps,
        toastId: messages.clearSelectValidatorFromCard.id,
      });
      dispatch(eggHatchingSelectActions.clearValidator());
    }
  }, [dispatch, isNFTFiltersDefault, selectedValidator]);

  if (!open) {
    return null;
  }

  return (
    <GModal
      show={open}
      backdrop="static"
      keyboard={false}
      onHide={onClose}
      className="modal--egg-collections modal--height-90h-x"
    >
      <EggCollection />
    </GModal>
  );
};

export default EggCollectionModal;
