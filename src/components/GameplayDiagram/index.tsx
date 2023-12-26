import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Heading } from '@/components/Typography';
import imgOne from '@/assets/images/gameplay-icon-1.webp';
import imgEgg1 from '@/assets/images/img--egg-claw.webp';
import imgClock from '@/assets/images/icon--clock.svg';
import imgLogoEggForce from '@/assets/images/eggforce--logo__ver2_color.webp';
import imgGift from '@/assets/images/icon--rewards.svg';
import imgWallet from '@/assets/images/icon--wallet.svg';
import imgReward from '@/assets/images/NFTs-eggs.webp';

const GameplayDiagram = () => {
  return (
    <div>
      <Heading className="text-center mb-3">Gameplay</Heading>
      <div className="gameplay-helper--root">
        <div className="gameplay-helper--top">
          <div className="gameplay-point point-1">
            <img
              loading="lazy"
              src={imgOne}
              alt=""
              className="gameplay-icon icon-dragon"
            />
          </div>
          <div className="gameplay-line line-4" />
        </div>
        <div className="gameplay-helper--bottom">
          <div className="gameplay-line line-1">
            <div className="gameplay-line-text point">
              <OverlayTrigger
                placement={'top'}
                overlay={
                  <Tooltip id={`tooltip-top`}>
                    <span>Connect your Casper Wallet via EggForce portal.</span>
                    <br />
                    <span>
                      You can either buy new eggs or use existing NFTs for
                      incubating later.
                    </span>
                  </Tooltip>
                }
              >
                <img
                  loading="lazy"
                  src={imgEgg1}
                  alt=""
                  className="gameplay-icon icon-text-1"
                />
              </OverlayTrigger>
              <span className="gameplay-point point-pulse purple"></span>
            </div>
          </div>
          <div className="gameplay-line line-2 is-horz">
            <div className="gameplay-line-text point">
              <OverlayTrigger
                placement={'top'}
                overlay={
                  <Tooltip id={`tooltip-top`}>
                    <span>
                      Select one validator which suits your incubating style,
                      and game on.
                    </span>
                  </Tooltip>
                }
              >
                <img
                  loading="lazy"
                  src={imgClock}
                  alt=""
                  className="gameplay-icon icon-text-2"
                />
              </OverlayTrigger>
              <span className="gameplay-point point-pulse white"></span>
            </div>
          </div>
          <div className="gameplay-line line-3">
            <div className="gameplay-line-text point">
              <OverlayTrigger
                placement={'top'}
                overlay={
                  <Tooltip id={`tooltip-top`}>
                    <span>
                      Rewards from staking will return to your selected Casper
                      Wallet.
                    </span>
                    <br />
                    <span>
                      All rewards will be recorded by EggForce as experience
                      point (EXP). This can be used to upgrade Egg level.
                    </span>
                  </Tooltip>
                }
              >
                <img
                  loading="lazy"
                  src={imgReward}
                  alt=""
                  className="gameplay-icon icon-text-3"
                />
              </OverlayTrigger>
              <span className="gameplay-point point-pulse"></span>
            </div>
          </div>
          <div className="gameplay-point point-2">
            <img
              loading="lazy"
              src={imgWallet}
              alt=""
              className="gameplay-icon icon-wallet"
            />
            <span className="text">Casper Wallet</span>
          </div>
          <div className="gameplay-point point-3">
            <img
              loading="lazy"
              src={imgLogoEggForce}
              alt=""
              className="gameplay-icon icon-eggforce"
            />
            <span className="text">EggForce Validator</span>
          </div>
          <div className="gameplay-point point-4">
            <img
              loading="lazy"
              src={imgGift}
              alt=""
              className="gameplay-icon icon-egg"
            />
            <span className="text">Rewards</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameplayDiagram;
