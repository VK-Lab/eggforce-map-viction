import imgLighting from '@/assets/images/icon--lightning-bolt.png';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
const SNCBoosterIcon = ({
  value = undefined,
}: {
  value: number | undefined;
}) => {
  if (!value) {
    return null;
  }

  return (
    <OverlayTrigger
      placement="top"
      overlay={
        <Tooltip id={`tooltip--snc-booster`}>
          Applying {value * 100}% SNC Boosting effect. See SNC Booster Details
          below for more information.
        </Tooltip>
      }
    >
      <img className="img lighting-bolt" src={imgLighting} alt="Level" />
    </OverlayTrigger>
  );
};

export default SNCBoosterIcon;
