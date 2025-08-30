import React, { useContext } from 'react';
import { Nav, Offcanvas } from 'react-bootstrap';
import { ThemeContext } from '../../context/ThemeContext';
import { Home, Users, Settings, Sun, Moon, LogOut } from 'react-feather';
import { useLocation,useNavigate } from 'react-router-dom';
import '../../styles/SideMenu.css';

const SideMenu = ({ show, handleClose }) => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();
  const navigate = useNavigate();

  // Determine active item based on current route
  const getActiveItem = () => {
    if (location.pathname === '/dashboard') return 'home';
    if (location.pathname === '/shipments') return 'shipments';
    if (location.pathname === '/settings') return 'settings';
    return 'home'; // default
  };

  const activeItem = getActiveItem();

  const handleLogout = () => {
    console.log('User logged out');
    navigate('/login'); // Redirect to login page
  };

  return (
    <>
      <div className={`fixed-side-menu d-none d-lg-block ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <div className="sidebar-content">
          <Nav className="flex-column sidebar-nav">
            <Nav.Link
              href="/dashboard"
              className={`sidebar-link ${activeItem === 'home' ? 'active' : ''}`}
            >
              <Home size={18} /> Dashboard
            </Nav.Link>
            <Nav.Link
              href="/shipments"
              className={`sidebar-link ${activeItem === 'shipments' ? 'active' : ''}`}
            >
              <Users size={18} /> Shipments
            </Nav.Link>
            <div className="sidebar-link logout-link" onClick={handleLogout}>
              <LogOut size={18} /> Logout
            </div>
          </Nav>
        </div>
      </div>
      
      <Offcanvas show={show} onHide={handleClose} placement="start" className={`mobile-side-menu ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>My App</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column sidebar-nav">
            <Nav.Link
              href="/dashboard"
              onClick={handleClose}
              className={`sidebar-link ${activeItem === 'home' ? 'active' : ''}`}
            >
              <Home size={18} /> Dashboard
            </Nav.Link>
            <Nav.Link
              href="/shipments"
              onClick={handleClose}
              className={`sidebar-link ${activeItem === 'shipments' ? 'active' : ''}`}
            >
              <Users size={18} /> Shipments
            </Nav.Link>
            <Nav.Link
              href="/settings"
              onClick={handleClose}
              className={`sidebar-link ${activeItem === 'settings' ? 'active' : ''}`}
            >
              <Settings size={18} /> Settings
            </Nav.Link>
            <div className="sidebar-link theme-toggle-wrapper" onClick={toggleTheme}>
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              {isDarkMode ? ' Light Mode' : ' Dark Mode'}
            </div>
            <div className="sidebar-link logout-link" onClick={handleLogout}>
              <LogOut size={18} /> Logout
            </div>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

    </>
  );
};

export default SideMenu;