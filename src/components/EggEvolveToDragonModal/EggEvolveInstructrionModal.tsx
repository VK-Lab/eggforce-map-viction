import { useCallback } from 'react';
import GModal from '@/components/GModal';
import { dragonManagementActions } from '@/modules/DragonManagementModule/store';
import { Heading } from '@/components/Typography';
import {
  useAppDispatch as useDispatch,
  useAppSelector as useSelector,
} from '@/app/hooks';
import SocialDiscordButton from '@/components/SocialDiscordButton';
import { selectDragonMakeInstructionModal } from '@/modules/DragonManagementModule/selectors';

const EggEvolveInstructrionModal = () => {
  const dispatch = useDispatch();
  const { open } = useSelector(selectDragonMakeInstructionModal);
  const onCloseHandler = useCallback(() => {
    dispatch(dragonManagementActions.hideMakeInstructionModal());
  }, [dispatch]);

  if (!open) {
    return null;
  }

  return (
    <GModal
      show={open}
      onHide={onCloseHandler}
      blurOverlay
      className={'egg-evolving--introduction'}
    >
      <div>
        <div className="game-instruction">
          <div className="game-instruction--box">
            <Heading h={4}>Instruction</Heading>
            <ul>
              <li>
                All unclaimed SNC points from the selected egg will be
                transferred to current wallet. Additionally, all XP points will
                be converted back into SNC.
              </li>
              <li>
                Please note that you cannot make Dragon with Egg which is{' '}
                <strong>in incubating mode</strong>,{' '}
                <strong>in merging process.</strong>
              </li>
              <li>
                Join EggForce community for further exploration{' '}
                <SocialDiscordButton skipConfused compact />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </GModal>
  );
};

export default EggEvolveInstructrionModal;
