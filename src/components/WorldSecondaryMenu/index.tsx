import useDevice from '@/hooks/useDevice';

const WorldSecondaryMenu = () => {
  const isDevice = useDevice();

  if (isDevice) {
    return null;
  }

  return <div></div>;
};

export default WorldSecondaryMenu;
