import { useCallback } from 'react';
import GModal from '@/components/GModal';
import { eggMergingActions } from '@/modules/EggMerging/store';
import { Heading } from '@/components/Typography';
import CONFIGS from '@/constants/settings';
import {
  useAppDispatch as useDispatch,
  useAppSelector as useSelector,
} from '@/app/hooks';
import SocialDiscordButton from '@/components/SocialDiscordButton';
import { selectEggMergingInstructionModal } from '@/modules/EggMerging/selectors';

const EggMergingInstructionModal = () => {
  const dispatch = useDispatch();
  const { open } = useSelector(selectEggMergingInstructionModal);
  const onCloseHandler = useCallback(() => {
    dispatch(eggMergingActions.hideMergeInstructionModal());
  }, [dispatch]);

  return (
    <GModal
      show={open}
      onHide={onCloseHandler}
      blurOverlay
      className={'egg-merging--introduction'}
    >
      <div>
        <div className="game-instruction">
          <div className="game-instruction--box">
            <Heading h={4}>Instruction</Heading>
            <ul>
              <li>
                Ensure that you have{' '}
                <strong>at least two Eggs in the same Element</strong> which you
                want to merge.
              </li>
              <li>
                Place the Egg you want to preserve{' '}
                <strong>as the main element in Slot 1</strong>. Any other
                selected eggs will be merged into this primary slot. They will
                be burned after the process has been completed.
              </li>
              <li>
                Begin by <strong>dragging the egg</strong> from right panel and{' '}
                <strong>dropping it into any preferred slot</strong> on the left
                panel.
              </li>
              <li>
                All SNC points that remain unclaimed from the selected eggs will
                be transferred to Egg 1.{' '}
                <strong>
                  Each selective egg will have a base bonus of random value from{' '}
                  {CONFIGS.MIN_MERGE_SNC_BONUS_POINT} to{' '}
                  {CONFIGS.MAX_MERGE_SNC_BONUS_POINT} SNC, excluding the Primary
                  one
                </strong>
                . Additionally, all XP points will be converted back into SNC.
              </li>
              <li>
                Please note that you cannot merge Eggs which are{' '}
                <strong>in incubating mode</strong>,{' '}
                <strong>in merging process.</strong>
              </li>
              <li>
                Hatchers can increase your Platinum Egg's{' '}
                <strong>Lucky Point</strong> when merging Silver, Gold, Platinum
                Eggs.
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

export default EggMergingInstructionModal;
