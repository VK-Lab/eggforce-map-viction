// @ts-ignore
import { useEffect, useCallback } from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { CookiesProvider } from 'react-cookie';
import { sharedToastProps } from '@/services/toast';
import { getEggforceConfiguration } from './modules/Auth/actions';
import { useAppDispatch as useDispatch } from './app/hooks';
import Worldmap from '@/screens/Worldmap';

import Layout from './components/Layout';
import NoMatchPage from './screens/404';
import routesConfig, { IRoute } from './routes/configs';
import 'react-toastify/dist/ReactToastify.css';
import 'animate.css/animate.min.css';
import './assets/scss/app.scss';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  const onUpdateBodyElement = useCallback(() => {
    const body = document.querySelector('body');

    if (location.pathname === '/world') {
      body?.classList.add('screen--worldmap');
      return;
    }

    body?.classList.remove('screen--worldmap');
  }, [location]);

  useEffect(() => {
    dispatch(getEggforceConfiguration());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Fix flicky scrollbar when mouse over elements with tooltip
   */
  useEffect(() => {
    onUpdateBodyElement();
  }, [onUpdateBodyElement]);

  return (
    <CookiesProvider>
      <ParallaxProvider>
        <ToastContainer {...sharedToastProps} />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Worldmap />} />
            {routesConfig
              .filter((route) => route.enabled)
              .map((route: IRoute) => (
                <Route
                  key={route.to}
                  path={route.to.substring(1, route.to.length)}
                  element={<route.component />}
                />
              ))}
            <Route path="*" element={<NoMatchPage />} />
          </Route>
        </Routes>
      </ParallaxProvider>
    </CookiesProvider>
  );
}

export default App;
