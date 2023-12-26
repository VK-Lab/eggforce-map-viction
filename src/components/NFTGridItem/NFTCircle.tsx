import cn from 'classnames';
import { useMemo } from 'react';
import isEqual from 'lodash/isEqual';
import { useAppSelector as useSelector } from '@/app/hooks';
import { selectValidatorsModule } from '@/modules/ValidatorsModule/selectors';
import ASSETS_URL from '@/constants/assetsURL';
import iconTreeSelvyn from '@/assets/images/icon--treeSelvyn.webp';

const NFTCircle = (props: any) => {
  const { validators } = useSelector(selectValidatorsModule, isEqual);
  const { shouldShowHatchButton, material, eggValidator } = props;
  const validatorIcon = useMemo(() => {
    if (!shouldShowHatchButton) {
      return undefined;
    }

    return validators?.find(
      (validator) => validator.publicKey === eggValidator,
    );
  }, [shouldShowHatchButton, validators, eggValidator]);
  const isSelvynMaterial = material.value === 'Selvyn’s nodules';
  const defaultEFLogo = ASSETS_URL.EggForceLogo;

  return (
    <div
      className={cn('nft-grid-item--circle', {
        validator: validatorIcon,
      })}
    >
      <img
        src={
          isSelvynMaterial
            ? iconTreeSelvyn
            : validatorIcon
            ? validatorIcon.icon.url
            : defaultEFLogo
        }
        loading="lazy"
        alt={material.value}
        title={material.value}
        className={cn('circle-icon', {
          tree: isSelvynMaterial,
          'eggforce-logo': !isSelvynMaterial && !validatorIcon,
          'validator-icon': validatorIcon,
        })}
      />
    </div>
  );
};

export default NFTCircle;
