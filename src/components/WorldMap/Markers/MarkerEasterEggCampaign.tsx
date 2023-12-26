import { useMemo } from 'react';
import L from 'leaflet';
import { Marker } from 'react-leaflet';
import { useAppDispatch as useDispatch } from '@/app/hooks';
import useCurrentUser from '@/hooks/useCurrentUser';
import { showConnectCSModal } from '@/modules/CasperSigner/store';
import casperEggIcon from '@/assets/images/zyro-image.webp';
import easterEggIcon from '@/assets/images/easter-egg.webp';
import MODULES_PERMISSION from '@/constants/modulesPermission';
import { packagesDetailActions } from '@/modules/WorldMint/store';
import useDevice from '@/hooks/useDevice';

const MarkerEasterEggCampaign = () => {
  const dispatch = useDispatch();
  const user = useCurrentUser();
  const isDevice = useDevice();

  const xPos = Math.random() * 79 + 5;
  const yPos = Math.random() * 23 - 177;
  const icons = [casperEggIcon, easterEggIcon];
  const markerIcon = icons[Math.floor(Math.random() * icons.length)];

  const eventHandlers = useMemo(
    () => ({
      click: () => {
        if (isDevice) {
          dispatch(packagesDetailActions.showCustomPackModal());
          return;
        }

        if (!user?.activeKey) {
          dispatch(showConnectCSModal());
          return;
        }

        /** TODO: Add tracking here if you want */
        dispatch(packagesDetailActions.showQuickbuykModal());
      },
    }),
    [dispatch, isDevice, user],
  );

  if (!MODULES_PERMISSION.USE_NFT_MINTING) {
    return null;
  }

  return (
    <Marker
      icon={L.icon({
        iconUrl: markerIcon,
        iconSize: [32, 32],
        className: 'validator-marker ignore-shadow internal',
      })}
      position={[xPos, yPos]}
      eventHandlers={eventHandlers}
    ></Marker>
  );
};

export default MarkerEasterEggCampaign;
