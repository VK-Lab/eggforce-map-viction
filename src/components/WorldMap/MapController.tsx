import React, { useState } from 'react';
import { useMapEvents } from 'react-leaflet';
import configs from '@/constants/settings';

function MapController() {
  const [isDebug, setDebug] = useState(false);
  const style: any = {
    position: 'fixed',
    width: isDebug ? 300 : 100,
    height: isDebug ? 300 : 20,
    bottom: 10,
    left: 10,
    overflow: 'auto',
    border: '1px solid black',
    zIndex: 10000,
    backgroundColor: 'white',
    color: 'black',
  };
  const [points, setPoints] = useState([] as any);
  // eslint-disable-next-line
  const map = useMapEvents({
    click: (e) => {
      /**
       * Use e.latlng for coord
       */
      const point = { lat: e.latlng.lat, lng: e.latlng.lng };
      setPoints([...points, point]);
    },
  });
  return (
    <React.Fragment>
      {configs.DEBUG_ENV && (
        <div style={style}>
          <button onClick={() => {
            setDebug(!isDebug);
          }}>{`Debug ${
            isDebug ? 'ON' : 'OFF'
          }`}</button>
          {isDebug &&
            points.map((p: any, index: number) => (
              <div key={`point--${index}`}>{`[${p.lat},${p.lng}]`}</div>
            ))}
        </div>
      )}
      <div className="eggForce--worldmap-top-gradient"></div>
      <div className="eggForce--worldmap-bottom-gradient"></div>
    </React.Fragment>
  );
}

export default MapController;
