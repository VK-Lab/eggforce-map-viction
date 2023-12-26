import useSWR from 'swr';
import API from '@/constants/api';
import { fetcher } from '@/services/axios';
import useCurrentUser from '@/hooks/useCurrentUser';

const useFetchNFTSummary = () => {
  const user = useCurrentUser();
  const { data } = useSWR(
    user ? API.fetchNFTSummary(user.activeKey) : null,
    fetcher,
  );

  return {
    summary: data ? data?.classes : null,
  };
};

export default useFetchNFTSummary;
