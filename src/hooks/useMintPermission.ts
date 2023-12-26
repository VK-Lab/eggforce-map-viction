import { useCallback, useEffect } from 'react';
import { usePrevious } from 'react-use';
import { useAppDispatch as useDispatch } from '@/app/hooks';
import useCurrentUser from '@/hooks/useCurrentUser';
import { reloadUserPermissions } from '@/modules/Auth/actions';

const useMintPermission = async () => {
  const dispatch = useDispatch();
  const user = useCurrentUser();
  const prevUser = usePrevious(user);

  const checkMintPermission = useCallback(
    async () => {
      if (!user || prevUser?.activeKey === user?.activeKey) {
        return;
      }
      
      // @ts-ignore
      await dispatch(reloadUserPermissions()).unwrap();
    },
    [prevUser, dispatch, user],
  );

  useEffect(() => {
    checkMintPermission();
  }, [checkMintPermission]);
};

export default useMintPermission;
