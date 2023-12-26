import { useCallback } from 'react';
import GModal from '@/components/GModal';
import { eggMergingActions } from '@/modules/EggMerging/store';
import {
  useAppSelector as useSelector,
  useAppDispatch as useDispatch,
} from '@/app/hooks';
import EggMergingLayout from '@/components/EggMergingLayout';
import { selectEggMergingModule } from './selectors';

const EggMergingModuleModal = () => {
  const dispatch = useDispatch();
  const eggMergingModule = useSelector(selectEggMergingModule);

  const { open } = eggMergingModule;

  const onClose = useCallback(() => {
    dispatch(eggMergingActions.hideModal());
  }, [dispatch]);

  if (!open) {
    return null;
  }

  return (
    <GModal
      show={open}
      backdrop="static"
      keyboard={false}
      onHide={onClose}
      className="egg-merging-module--modal"
    >
      <EggMergingLayout />
    </GModal>
  );
};

export default EggMergingModuleModal;
