import { Outlet } from 'react-router-dom';
import useWalletConnector from '@/hooks/useWalletConnector';
import useInitWalletInstances from '@/hooks/useInitWalletInstances';
import GlobalFireflies from '../GlobalFireflies';

const Layout = () => {
  /**
   * Should init important initialization here
   */
  useInitWalletInstances();
  useWalletConnector();

  return (
    <div className="App">
      <Outlet />
      <GlobalFireflies />
    </div>
  );
};

export default Layout;
