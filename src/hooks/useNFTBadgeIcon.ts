import { useMemo } from 'react';
import imgWood from '@/assets/images/ele--wood.png';
import imgWind from '@/assets/images/ele--wind.png';
import imgWater from '@/assets/images/ele--water.png';
import imgMetal from '@/assets/images/ele--metal.png';
import imgFire from '@/assets/images/ele--fire.png';
import imgEarth from '@/assets/images/ele--earth.png';

import imgBackgroundNFTWood from '@/assets/images/bg-ele--wood.png';
import imgBackgroundNFTWind from '@/assets/images/bg-ele--wind.png';
import imgBackgroundNFTWater from '@/assets/images/bg-ele--water.png';
import imgBackgroundNFTMetal from '@/assets/images/bg-ele--metal.png';
import imgBackgroundNFTFire from '@/assets/images/bg-ele--fire.png';
import imgBackgroundNFTEarth from '@/assets/images/bg-ele--earth.png';

const useNFTBadgeIcon = ({
  element,
  isBackground = false,
}: {
  element: string;
  isBackground?: boolean;
}) => {
  const path = useMemo(() => {
    switch (element) {
      case 'Water':
        return isBackground ? imgBackgroundNFTWater : imgWater;
      case 'Fire':
        return isBackground ? imgBackgroundNFTFire : imgFire;
      case 'Wood':
        return isBackground ? imgBackgroundNFTWood : imgWood;
      case 'Metal':
        return isBackground ? imgBackgroundNFTMetal : imgMetal;
      case 'Earth':
        return isBackground ? imgBackgroundNFTEarth : imgEarth;
      case 'Wind':
        return isBackground ? imgBackgroundNFTWind : imgWind;
      default:
        return null;
    }
  }, [element, isBackground]);

  return path;
};

export default useNFTBadgeIcon;
