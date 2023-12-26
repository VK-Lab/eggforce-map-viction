import styled from 'styled-components';
import L from 'leaflet';
import isEmpty from 'lodash/isEmpty';
import { Rectangle, Tooltip, Marker, Popup, LayerGroup } from 'react-leaflet';
import CardValidator from '../CardValidator';
import useValidatorsLoader from '@/hooks/useValidatorsLoader';
import imgEgg1 from '@/assets/images/icon--treeSelvyn.webp';

const StyledPopup = styled(Popup)`
  .leaflet-popup-tip {
    background-color: ${(props) => {
      return !isEmpty(props.theme) ? props.theme : '#071A52';
    }};
  }
`;

const ValidatorsMarkers = ({ globalBounds }: any) => {
  const { data, placeholderData, isLoading } = useValidatorsLoader();

  if (isLoading && !data?.length) {
    return (
      <LayerGroup>
        {placeholderData.map((placeholder: any, index) => {
          return (
            <Marker
              key={`${placeholder.name}--${index}`}
              icon={L.icon({
                iconUrl: imgEgg1,
                iconSize: [60, 60],
                className: 'validator-marker',
              })}
              position={[placeholder.lat, placeholder.lng]}
            ></Marker>
          );
        })}
      </LayerGroup>
    );
  }

  return (
    <LayerGroup>
      {data.map((validator: any) => {
        const myIcon = L.icon({
          iconUrl: validator.icon.url,
          iconSize: validator.icon.iconSize,
          className: 'validator-marker',
        });
        const theme = validator.theme ?? undefined;
        return (
          <Marker
            key={`${validator.name}--icon`}
            icon={myIcon}
            position={[validator.position.lat, validator.position.lng]}
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
            <StyledPopup
              theme={theme}
              keepInView
              className="world--validator-marker"
            >
              <CardValidator
                background={validator.background}
                theme={theme}
                validator={{
                  name: validator.name,
                  imageSrc: validator.icon.url,
                  address: validator.publicKey,
                  verified: validator.verified,
                  totalStaked: validator.totalStaked,
                  fee: validator.fee,
                  meta: validator.shortMeta,
                  xpBoost: validator.xpBoost,
                  isActiveValidator: validator.isActiveValidator,
                  isFull: validator.isFull,
                }}
              />
            </StyledPopup>
          </Marker>
        );
      })}
      <Rectangle bounds={globalBounds} className={`map-overlay`} />
    </LayerGroup>
  );
};

export default ValidatorsMarkers;
