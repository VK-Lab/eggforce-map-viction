import L from 'leaflet';
import { Rectangle, Tooltip, Marker, LayerGroup } from 'react-leaflet';
import useValidatorsLoader from '@/hooks/useValidatorsLoader';
import { useMemo } from 'react';

const ValidatorsDraggableMarkers = ({ globalBounds } : any ) => {
  const body = document.querySelector("body");
  const { data } = useValidatorsLoader();

  const eventHandlers = useMemo(
    () => ({
      dragstart() {
        body?.classList.add("marker-dragging");
      },
      dragend(e: any) {
        console.log(e.target.getLatLng());
        body?.classList.remove("marker-dragging");
      },
    }),
    [body],
  );

  return (
    <LayerGroup>
      {data.map((validator: any) => {
        const myIcon = L.icon({
          iconUrl: validator.icon.url,
          iconSize: validator.icon.iconSize,
          className: 'validator-marker',
        });
        return (
          <Marker
            draggable
            eventHandlers={eventHandlers}
            key={`${validator.name}--icon`}
            icon={myIcon}
            position={[validator.lat, validator.lng]}
          >
            <Tooltip
              className={'marker--share marker--tooltip'}
              direction="bottom"
              offset={[0, 30]}
              opacity={1}
              permanent
            >
              {validator.name}
            </Tooltip>
          </Marker>
        );
      })}
      <Rectangle
        bounds={globalBounds}
        className={`map-overlay`}
      />
    </LayerGroup>
  );
};

export default ValidatorsDraggableMarkers;
