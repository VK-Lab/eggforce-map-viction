import isEmpty from 'lodash/isEmpty';
import differenceInHours from 'date-fns/differenceInHours';
import configs from '@/constants/settings';

export const isValidDeployResult = (result: any) => {
  return Boolean(result && !isEmpty(result?.signedDeploy));
};

export const isDeployTooOld = (
  time: string,
  timespan = configs.DIFF_DURATION_HOURS,
) => {
  const diff = differenceInHours(new Date(), new Date(time));
  if (diff > timespan) {
    return true;
  }
  return false;
};
