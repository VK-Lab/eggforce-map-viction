import { useState } from 'react';
import L from 'leaflet';
import { useMapEvent, useMap, Marker, LayerGroup } from 'react-leaflet';

const EASTSIDE = [
  {
    name: 'Sethd',
    latlng: [78.56048828398782, -25.224609375000004],
  },
  {
    name: 'Benun',
    latlng: [74.23587806874866, 64.59960937500001],
  },
  {
    name: 'Gerbmen',
    latlng: [81.69784444971418, 66.18164062500001],
  },
  {
    name: 'Hesatornd',
    latlng: [83.32895075967836, -63.01757812500001],
  },
  {
    name: 'Hekin',
    latlng: [81.63414891575125, -99.755859375],
  },
  {
    name: 'Kheprous',
    latlng: [76.840816414431, -131.39648437500003],
  },
  {
    name: 'Inegth',
    latlng: [80.7887954036286, -51.416015625],
  },
  {
    name: 'Vepthys',
    latlng: [69.09993967425089, 62.22656250000001],
  },
  {
    name: 'Seshvar',
    latlng: [70.72897946208789, -16.962890625000004],
  },
  {
    name: 'Neith-ish',
    latlng: [83, 28],
  },
  {
    name: 'Saigish',
    latlng: [71.93815765811696, -81.82617187500001],
  },
];

const WEST_SIDE = [
  {
    name: 'Ankend',
    latlng: [32.91648534731439, -8.437500000000002],
  },
  {
    name: 'Amonet',
    latlng: [68.23682270936281, -120.84960937500001],
  },
  {
    name: 'Turkerd',
    latlng: [74.98218270428187, -98.26171875000001],
  },
  {
    name: 'Dallish',
    latlng: [78.93770843550641, -75.76171875000001],
  },
  {
    name: 'Harnthor',
    latlng: [57.37393841871411, -146.60156250000003],
  },
  {
    name: 'Monterd',
    latlng: [58.07787626787517, -107.138671875],
  },
  {
    name: 'Satanwa',
    latlng: [47.57652571374621, -40.69335937500001],
  },
  {
    name: 'Wosrysh',
    latlng: [27.839076094777816, -51.32812500000001],
  },
  {
    name: 'Woradish',
    latlng: [53.9560855309879, 8.876953125000002],
  },
  {
    name: 'Tanig',
    latlng: [26.980828590472107, -94.306640625],
  },
  {
    name: 'So-avisk',
    latlng: [16.93070509876554, -142.38281250000003],
  },
  {
    name: 'Radome',
    latlng: [63.11463763252091, -167.60742187500003],
  },
];

const LandnamesMarkers = ({ zooms }: any) => {
  const map = useMap();
  const [currentZoom, setZoom] = useState(zooms.zoom ?? 4);

  useMapEvent('zoomend', () => {
    setZoom(map.getZoom());
  });

  return (
    <LayerGroup>
      {[...WEST_SIDE, ...EASTSIDE].map((location) => {
        const text = L.divIcon({
          className: `marker--share marker--land-name zoom-${currentZoom}`,
          html: location.name,
        });
        return (
          <Marker
            key={location.name}
            icon={text}
            position={location.latlng as [number, number]}
          />
        );
      })}
    </LayerGroup>
  );
};

export default LandnamesMarkers;
