import React, { useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import routesConfig from '@/routes/configs';

const useHeader = () => {
  const renderNavLink = (route: any, eventKey: any) => {
    if (route?.isExternal) {
      return (
        <a
          key={route.to}
          href={route.to}
          target="_blank"
          rel="nofollow noopener noreferrer"
          className="nav-link ms-lg-2 ms-xl-4 ms-2"
        >
          <span>{route.label}</span>
        </a>
      );
    }

    return (
      <Nav.Link
        eventKey={eventKey + 1}
        as={NavLink}
        key={route.to}
        to={route.to}
        className="ms-lg-2 ms-xl-4 ms-2"
      >
        <span>{route.label}</span>
      </Nav.Link>
    );
  };

  const renderNavigation = useCallback(() => {
    return routesConfig.map((route, index) => {
      if (!route.visible) {
        return null;
      }
      return renderNavLink(route, index);
    });
  }, []);

  return { renderNavLink, renderNavigation };
};

export default useHeader;
