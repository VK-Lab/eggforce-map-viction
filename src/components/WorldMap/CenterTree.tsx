import L from 'leaflet';
import imgEgg1 from '@/assets/images/img--egg-claw.webp';
import {
  Marker,
  Popup,
} from 'react-leaflet';
import CardValidator from '@/components/CardValidator';
import validatorBackground from "@/assets/chapter-images/chapter1--03.webp";
import ASSETS_URL from '@/constants/assetsURL';

const CenterTree = () => {
  const myIcon = L.icon({
    iconUrl: imgEgg1,
    iconSize: [120, 120]
  });

  return (
    <Marker icon={myIcon} position={[73.92246884621466, -49.5703125]}>
      <Popup className='world--validator-marker'>
        <div>
          <CardValidator
            background={validatorBackground}
            validator={{
              name: 'OriginStake',
              imageSrc: ASSETS_URL.OriginStake,
              address:
                '01fa332dac2f307a5f3478278ca2ca65552b2e99de3c552698867b4a6a4235c50',
              verified: true,
            }}
          />
          </div>
      </Popup>
    </Marker>
  )
}

export default CenterTree;