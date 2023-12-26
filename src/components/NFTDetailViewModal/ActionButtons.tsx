import React from 'react';
import isEmpty from 'lodash/isEmpty';
import Button from '@/components/GButton';
import { NFTEggStatus } from '@/types/NFTItem';
import { Links } from '@/constants/publicURL';
import LogoDiscord from '@/assets/images/discord--white.svg';
import iconHatch from '@/assets/images/icon--hatch.png';
import iconUnhatch from '@/assets/images/icon--unhatch-2.png';
import iconLevelUp from '@/assets/images/icon--xp.png';
import iconEvolveDragon from '@/assets/images/icon--evolve.png';
import commonMessages from '@/constants/commonMessages';
import MODULES_PERMISSION from '@/constants/modulesPermission';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

const ActionButtons = ({
  egg = {},
  onClaim,
  onHatch,
  onConfirmUnhatch,
  onConfirmEvolveToDragon,
  isInstallment,
}: any) => {
  if (!isEmpty(egg) && egg?.status === NFTEggStatus.failed) {
    return (
      <Button
        asLink
        href={Links.discord}
        className="sharing-button bg--discord"
      >
        <span className="circle discord">
          <img src={LogoDiscord} className="logo" alt="EggForce Social Link" />
        </span>
        <span className="label">Support from Discord Community</span>
      </Button>
    );
  }

  return (
    <React.Fragment>
      <div className="nft-action-button--column column--claim">
        <Button
          disabled={
            isEmpty(egg) ||
            egg?.isProcessing ||
            egg?.status === NFTEggStatus.failed
          }
          className="inside-nft-detail btn--nft-action btn--claim-snc"
          onClick={onClaim}
          btnStyle="5"
          size="xl"
        >
          <img
            className="icon icon--claim-snc"
            src={iconLevelUp}
            alt={commonMessages.labelClaimSNC.defaultMessage}
          />
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip id="tooltip--level-up-egg">
                Level up your Egg by swapping your earned SNC to XP. Unavailable
                when the Egg is in processing mode and when the the Egg status
                is failed.
              </Tooltip>
            }
          >
            <span className="text-shadow">
              {commonMessages.labelClaimSNC.defaultMessage}
            </span>
          </OverlayTrigger>
        </Button>
      </div>
      <div className="nft-action-button--column column--hatch">
        <Button
          disabled={
            egg?.isProcessing ||
            egg?.status === NFTEggStatus.failed ||
            egg?.status === NFTEggStatus.minting
          }
          className="inside-nft-detail btn--nft-action btn--start-hatching"
          onClick={onHatch}
          btnStyle="5"
          size="xl"
        >
          <img
            className="icon icon--hatch"
            src={iconHatch}
            alt={commonMessages.labelDelegate.defaultMessage}
          />
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip id="tooltip--incubate-egg">
                Grow (incubate) your Egg by staking VIC. On top of your staking
                rewards (VIC) you will also earn SNC, which can be used for
                various actions.
              </Tooltip>
            }
          >
            <span className="text-shadow">
              {commonMessages.labelDelegate.defaultMessage}
            </span>
          </OverlayTrigger>
        </Button>
      </div>
      <div className="nft-action-button--column column--unhatch">
        <Button
          disabled={
            egg?.isProcessing ||
            egg?.status === NFTEggStatus.failed ||
            egg?.status === NFTEggStatus.minting
          }
          className="inside-nft-detail btn--nft-action btn--stop-hatching"
          onClick={onConfirmUnhatch}
          btnStyle="6"
          size="xl"
        >
          <img
            className="icon icon--unhatch"
            src={iconUnhatch}
            alt={commonMessages.labelUndelegate.defaultMessage}
          />
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip id="tooltip--incubate-egg">
                Grow (incubate) your Egg by staking VIC. On top of your staking
                rewards (VIC) you will also earn SNC, which can be used for
                various actions.
              </Tooltip>
            }
          >
            <span className="text-shadow">
              {commonMessages.labelUndelegate.defaultMessage}
            </span>
          </OverlayTrigger>
        </Button>
      </div>
      {MODULES_PERMISSION.USE_DRAGON_HATCH_MODULE && (
        <div className="nft-action-button--column column--evolve-dragon">
          <Button
            disabled={egg?.isProcessing}
            className="inside-nft-detail btn--nft-action btn--claim-snc"
            onClick={onConfirmEvolveToDragon}
            btnStyle="5"
            size="xl"
          >
            <img
              className="icon icon--evolve-dragon"
              src={iconEvolveDragon}
              alt={commonMessages.labelDragonHatch.defaultMessage}
            />
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip id="tooltip--dragon-hatch">
                  Hatch your Egg into a Dragon. The higher the level of the Egg,
                  the higher the chances for a better Dragon rarity. Please note
                  that your Egg will be burned after hatching.
                </Tooltip>
              }
            >
              <span>{commonMessages.labelDragonHatch.defaultMessage}</span>
            </OverlayTrigger>
          </Button>
        </div>
      )}
    </React.Fragment>
  );
};

export default ActionButtons;
