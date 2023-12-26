import { useState, useEffect, useCallback } from 'react';
import { useMap } from 'react-leaflet';
import { CheckCircle, Circle } from 'react-bootstrap-icons';
import { Heading } from '@/components/Typography';
import GModal from '@/components/GModal';
import Button from '@/components/GButton';
import { getLocalStorageItem, setLocalStorageItem } from '@/services/localStorage';
import markerIcon from "@/assets/images/game-icon.png";

const NewIconsNotificationModal = () => {
  const map = useMap();
  const cachedData = getLocalStorageItem('notifyGameIcon');
  const [isVisible, setVisible] = useState<boolean>(false);
  const [hideNextTime, setHideNextTime] = useState<boolean>(false);
  const onHideHandler = useCallback(() => {
    if (hideNextTime) {
      setLocalStorageItem("notifyGameIcon", true)
    }
    setVisible(false);
  }, [hideNextTime]);

  const onMoveMapCenter = useCallback(() => {
    map.setView([56.7, 4.04], map.getZoom());
    onHideHandler();
  }, [map, onHideHandler]);

  useEffect(() => {
    if (!cachedData) {
      setVisible(true);
    }
  }, [cachedData]);

  return (
    <GModal
      show={isVisible}
      modalType="notification"
      closeButton={false}
      onHide={onHideHandler}
      dialogClassName="new-icon-notifications--modal"
    >
      <Heading h={4} className="mb-3">
        New Game icon added
      </Heading>
      <div className="body">
        <div style={{ textAlign: "center" }}>
          <img src={markerIcon} alt="Game icon" />
        </div>
        <p className="text">New Game icon is added to EggForce map, feel free to play around and enjoy minigames from Selvyn.</p>
        <div className="claim-modal--buttons">
          <Button
            style={{ minWidth: 200 }}
            size="small"
            onClick={onHideHandler}
            btnStyle="3"
          >
            OK
          </Button>
          <Button size="small" onClick={onMoveMapCenter}>
            Take me to Game icon
          </Button>
        </div>
        <div className="checkbox--never-remind">
          <button className="btn--checkbox-type" onClick={() => setHideNextTime(prev => !prev)}>
            <span className="icon">
              {hideNextTime ? <CheckCircle style={{ color: "#F9F871"}} /> : <Circle />}
            </span>
            <span className="label">Hide this next time</span>
          </button>
        </div>
      </div>
    </GModal>
  )
}

export default NewIconsNotificationModal;
