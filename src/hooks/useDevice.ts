import { useMedia } from 'react-use';

const useDevice = () => {
  const isDevice = useMedia('(max-width: 768px)');

  return isDevice;
};

export default useDevice;
