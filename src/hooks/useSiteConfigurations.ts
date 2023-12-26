import isEqual from 'lodash/isEqual';
import { selectEggForceSiteConfiguration } from '@/modules/Auth/selectors';
import { useAppSelector } from '@/app/hooks';

const useSiteConfigurations = () => {
  return useAppSelector(selectEggForceSiteConfiguration, isEqual);
};

export default useSiteConfigurations;
