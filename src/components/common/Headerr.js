import { useContext, useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { ThemeContext } from '../../context/ThemeContext';
import { Sun, Moon } from 'react-feather';
import SideMenu from './SideMenu';
import '../../styles/Header.css';

const Header = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => setShowMenu(!showMenu);

  return (
    <>
      <Navbar bg="light" expand="lg" className="shadow-sm fixed-top">
        <Container>
          <Navbar.Brand href="/home" className="d-lg-none order-1">
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="side-menu"
            className="order-0"
            onClick={toggleMenu}
          >
            <span className="navbar-toggler-icon" />
          </Navbar.Toggle>
          <Navbar.Brand href="/home" className="d-none d-lg-block order-0">
          </Navbar.Brand>
          <Nav className="ms-auto d-none d-lg-flex align-items-center">
            <div className="theme-toggle ms-3" onClick={toggleTheme}>
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </div>
          </Nav>
        </Container>
      </Navbar>
      <SideMenu show={showMenu} handleClose={toggleMenu} />
    </>
  );
};

export default Header;