import { useEffect } from 'react';
import useSWR from 'swr';
import isEqual from 'lodash/isEqual';
import { fetcher } from '@/services/axios';
import API from '@/constants/api';
import {
  useAppDispatch as useDispatch,
  useAppSelector as useSelector,
} from '@/app/hooks';
import validatorBackground from '@/assets/chapter-images/chapter1--03.webp';
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from '@/services/localStorage';
import type {
  ValidatorResponseType,
  ValidatorLogoSize,
  ValidatorType,
} from '@/types/validator';
import { selectValidatorsModule } from '@/modules/ValidatorsModule/selectors';
import { validatorssStoreActions } from '@/modules/ValidatorsModule/store';

const defaultIconSize: ValidatorLogoSize = [60, 60];
const transformServerDataToClientdata = (
  data: ValidatorResponseType[],
): ValidatorType[] => {
  return (
    data?.map((validator) => ({
      publicKey: validator.publicKey,
      name: validator.name,
      icon: {
        url: validator.logoUrl,
        iconSize: defaultIconSize,
      },
      position: {
        lat: validator.position.lat,
        lng: validator.position.lng,
      },
      xpBoost: validator.xpBoost,
      delegatorsStaked: validator.delegatorsStaked,
      selfStaked: validator.selfStaked,
      totalStaked: validator.totalStaked,
      fee: validator.fee,
      description: validator.description,
      // Belows are optional
      verified: validator?.verified ?? false,
      background: validator?.background ?? validatorBackground,
      shortMeta: validator?.shortMeta ?? validator.description ?? '',
      theme: validator?.theme,
      isActiveValidator: validator?.isActiveValidator ?? false,
      // isActiveValidator: true, // validator?.isActiveValidator ?? false,
      isFull: validator?.isFull ?? false,
    })) ?? []
  );
};

const placeholderData = [
  {
    lat: 79.07181201408547,
    lng: -50.625,
  },
  {
    lat: 69.28725695167886,
    lng: -78.75000000000001,
  },
  {
    lat: 69.99053495947655,
    lng: -29.355468750000004,
  },
  {
    lat: 76.96033358827414,
    lng: -11.689453125000002,
  },
  {
    lat: 79.4484773996116,
    lng: -102.65625000000001,
  },
  {
    lat: 59.75639504935632,
    lng: -89.82421875000001,
  },
];

const useValidatorsLoader = () => {
  const dispatch = useDispatch();
  const validatorsStore = useSelector(selectValidatorsModule, isEqual);

  const isJSON = true;
  const cachedData = getLocalStorageItem('validators', isJSON);
  // const urlFetchValidators = user?.activeKey
  //   ? `${API.validators}/?publicKey=${user.activeKey}`
  //   : API.validators;
  const urlFetchValidators = API.validators;

  const { data, error } = useSWR(urlFetchValidators, fetcher);
  const transformedData = transformServerDataToClientdata(data);

  // Use cache if available while latest data is being loaded
  let finalData = !data && cachedData?.length ? cachedData : transformedData;
  // Store validators into cache
  if (transformedData?.length) {
    setLocalStorageItem('validators', transformedData);
  }

  useEffect(() => {
    const { validators } = validatorsStore;
    if (!isEqual(validators, finalData)) {
      dispatch(validatorssStoreActions.bindData(finalData));
    }
  }, [dispatch, finalData, validatorsStore]);

  return {
    data: validatorsStore.validators,
    isLoading: !error && !data?.length,
    isError: error,
    placeholderData,
  };
};

export default useValidatorsLoader;
