import {
  // useMap,
  TileLayer
} from 'react-leaflet';

function EggForceWorldMap({ zooms }: any) {
  // const url = `./tiles/{z}/{x}/{y}.png`;
  const urlIP ="http://world.eggforce.io/{z}/{x}/{y}.png";
  
  // Get maximum bound of current map and assign to maxBounds
  // const map = useMap();
  // const bounds = map.getBounds();

  return (
    <TileLayer
      {...zooms}
      attribution='&copy; <a href="https://www.eggforce.io">EggForce</a>'
      url={urlIP}
      noWrap
      minZoom={zooms.minZoom ?? 2}
      maxZoom={zooms.maxZoom ?? 4}
    />
  )
}

export default EggForceWorldMap;
