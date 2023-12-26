import { ZoomControl, MapContainer } from 'react-leaflet';
import LandnamesMarkers from './LandnamesMarkers';
import MapController from './MapController';
import EggForceWorldMap from './EggForceWorldMap';
import ValidatorsMarkers from './ValidatorsMarkers';

import 'leaflet/dist/leaflet.css';

type castedBound = [[number, number], [number, number]];
const WorldMap = ({ height = 'calc(100vh - 0px)' }: any) => {
  const globalBounds: castedBound = [
    [95, 90],
    [0, -180],
  ];
  const zooms = {
    minZoom: 4,
    maxZoom: 5,
    zoom: 4,
    maxBoundsViscosity: 1,
    className: 'eggForce-worldmap--root',
    center: [73, -50] as [number, number],
    scrollWheelZoom: true,
    dragging: true,
    zoomControl: false,
  };
  const style = {
    height,
    overflow: 'hidden',
    transform: `translateY(0px)`,
  };
  return (
    <div style={style}>
      <MapContainer {...zooms} style={{ height }} maxBounds={globalBounds}>
        <EggForceWorldMap zooms={zooms} />
        <ZoomControl position="bottomright" />
        <ValidatorsMarkers globalBounds={globalBounds} />
        <LandnamesMarkers zooms={zooms} />
        <MapController />
      </MapContainer>
    </div>
  );
};

export default WorldMap;
