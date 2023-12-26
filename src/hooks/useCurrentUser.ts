import isEqual from 'lodash/isEqual';
import { selectAuth } from '@/modules/Auth/selectors';
import { useAppSelector as useSelector } from '@/app/hooks';
import type { UserType } from '@/modules/Auth/store';

const useCurrentUser = () => {
  const data = useSelector(selectAuth, isEqual);
  return data.currentUser as UserType;
};

export default useCurrentUser;
