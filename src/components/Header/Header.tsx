import cn from 'classnames';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useMemo } from 'react';
import { usePrevious, useWindowScroll } from 'react-use';
import { NavLink } from 'react-router-dom';
import useHeader from './useHeader';
import EnterWorldmapButton, {
  StickyEnterDiscordCommunityButton,
} from '@/components/EnterWorldmapButton';
import { useLocation } from 'react-router-dom';
import { Links } from '../../constants/publicURL';
interface Props {
  hidden?: boolean;
}

const Header = ({ hidden = false }: Props) => {
  const headerHeight = 110;
  const location = useLocation();
  const { y } = useWindowScroll();
  const lastYPosition = usePrevious(y);
  const { renderNavLink, renderNavigation } = useHeader();

  const shouldHideStickyDiscordButton = useMemo(() => {
    if (location.pathname === '/journey') {
      return true;
    }
    return false;
  }, [location.pathname]);

  if (hidden) {
    return null;
  }

  return (
    <Container fluid className="layout--header__root">
      <Navbar
        collapseOnSelect
        expand="lg"
        className={cn('header--navbar-wrapper', {
          'is-small': y >= headerHeight,
          hidden: lastYPosition && y > lastYPosition,
          transparent: location.pathname === '/journey',
        })}
        fixed="top"
      >
        <Container fluid className={cn('header--primary')}>
          <Navbar.Brand
            as={NavLink}
            to="/home"
            className="header--primary-logo"
          >
            EggForce
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="eggforce-navbar-nav"
            className="header--mobile-toggler"
          >
            <span />
            <span />
            <span />
          </Navbar.Toggle>
          <Navbar.Offcanvas
            id="eggforce-navbar-nav"
            aria-labelledby="eggforce-navbar-nav"
            placement="end"
            className="mobile--offcanvas"
          >
            <Offcanvas.Header closeVariant="white" closeButton>
              <Offcanvas.Title>
                <Navbar.Brand
                  as={NavLink}
                  to="/home"
                  className="header--primary-logo"
                >
                  EggForce
                </Navbar.Brand>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="ms-auto ef-menu--primary">
                {renderNavigation()}
                {renderNavLink(
                  {
                    to: Links.medium,
                    label: 'Articles',
                    isExternal: true,
                  },
                  100,
                )}
                {renderNavLink(
                  {
                    to: Links.doc,
                    label: 'Whitepaper',
                    isExternal: true,
                  },
                  100,
                )}
              </Nav>
              {/* <Button
                className="nav--buy-nft btn--style-2 inside"
                as="a"
                variant="link"
                target="_blank"
                href={Links.doc}
              >
                Whitepaper
              </Button> */}
              <div className="mobile--enter-world">
                <EnterWorldmapButton />
              </div>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
          <Button
            className="d-none nav--buy-nft ms-4 btn--style-2 outside"
            as="a"
            variant="link"
            target="_blank"
            rel="nofollow noopener noreferrer"
            href={Links.doc}
          >
            Whitepaper
          </Button>
        </Container>
      </Navbar>
      {!shouldHideStickyDiscordButton && <StickyEnterDiscordCommunityButton />}
    </Container>
  );
};
export default Header;
