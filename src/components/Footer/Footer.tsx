import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import cn from 'classnames';
import { useLocation, NavLink } from 'react-router-dom';
import LogoTw from '@/assets/images/twitter.svg';
import LogoDiscord from '@/assets/images/discord.svg';
import { Links } from '@/constants/publicURL';

interface Props {
  hidden?: boolean;
}

const Footer = ({ hidden = false }: Props) => {
  const location = useLocation();

  if (hidden) {
    return null;
  }

  return (
    <Container
      fluid
      className={cn('layout--footer__root', {
        'page--journey': location.pathname === '/journey',
      })}
    >
      <Navbar>
        <Container fluid className="footer--primary footer-content--wrapper">
          <div className="footer-content--left footer-logo--wrapper">
            <Navbar.Brand
              as={NavLink}
              to="/home"
              className="footer-logo--logo desktop"
            >
              EggForce
            </Navbar.Brand>
            <p className="footer-logo--text">
              Copyright © 2022 EggForce. All rights reserved.
            </p>
          </div>
          <div className="footer-content--right ms-md-auto">
            <div className="footer-columns--wrapper">
              <div className="footer-columns footer-column-1">
                <Nav className="flex-column">
                  {/* <Nav.Link href="/">Terms of Use of EggForce</Nav.Link> */}
                  {/* <Nav.Link href="/">Privacy Policy</Nav.Link> */}
                  {/* <Nav.Link href="/">FAQs</Nav.Link> */}
                  <Nav.Link href="/">Home</Nav.Link>
                </Nav>
              </div>
              <div className="footer-columns footer-column-2">
                <Nav className="flex-column">
                  <Nav.Link href="/story">Story</Nav.Link>
                  <a href="/story" className="nav-link">
                    Articles
                  </a>
                  <a href="/story" className="nav-link">
                    Whitepaper
                  </a>
                  {/* <Nav.Link href="/">Home</Nav.Link> */}
                  {/* <Nav.Link href="/">Gameplay</Nav.Link> */}
                </Nav>
              </div>
              <div className="footer-columns footer-column-3">
                <Nav className="flex-column">
                  {/* <Nav.Link href="/story">Story</Nav.Link> */}
                  <Nav.Link href="/gameplay">Gameplay</Nav.Link>
                  <Nav.Link href="/SNC-airdrop">SNC</Nav.Link>
                  <Nav.Link href="/journey">Journey</Nav.Link>
                  {/* <Nav.Link href="/">Whitepaper</Nav.Link> */}
                </Nav>
              </div>
              <div className="footer-columns footer-column-4">
                <Navbar.Brand
                  as={NavLink}
                  to="/home"
                  className="footer-logo--logo mobile"
                >
                  EggForce
                </Navbar.Brand>
              </div>
            </div>
            <div className="footer-social-links--wrapper">
              <p className="text">FOLLOW US ON SOCIAL MEDIA</p>
              <Nav className="social-links">
                <Nav.Link
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  href={Links.twitter}
                  className="social-link tw"
                >
                  <img
                    src={LogoTw}
                    className="social-link--logo"
                    alt="EggForce Social Link"
                  />
                </Nav.Link>
                <Nav.Link
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  href={Links.discord}
                  className="social-link discord"
                >
                  <img
                    src={LogoDiscord}
                    className="social-link--logo"
                    alt="EggForce Social Link"
                  />
                </Nav.Link>
              </Nav>
            </div>
            <div className="footer-copyright--mobile">
              <Nav className="footer-copyright--row">
                {/* <Nav.Link href="/">Terms of Use of EggForce</Nav.Link> */}
                {/* <Nav.Link href="/">Privacy Policy</Nav.Link> */}
                {/* <Nav.Link href="/">FAQs</Nav.Link> */}
              </Nav>
              <p className="footer-logo--text mobile">
                Copyright © 2022 EggForce. All rights reserved.
              </p>
            </div>
          </div>
        </Container>
      </Navbar>
    </Container>
  );
};

export default Footer;
