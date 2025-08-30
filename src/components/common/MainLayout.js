import { useContext } from 'react';
import { Container } from 'react-bootstrap';
import { ThemeContext } from '../../context/ThemeContext';
import Header from './Headerr';
import Footer from './Footer';
import SideMenu from './SideMenu';
import { logo } from '../../api/imageEndpoints'; // Assuming logo is imported here
import '../../styles/MainLayout.css';

const MainLayout = ({ children }) => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div className={`layoutContainer ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="logo-container">
        <img src={logo} alt="ShipTrack Logo" className="main-logo" />
        <span className="navbar-title">Track_Your_Ship</span>
      </div>
      <SideMenu />
      <div className="content-wrapper">
        <Header />
        <main className="layout-content">
          <Container>{children}</Container>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;