import { Outlet } from 'react-router-dom';
import BreadCrumbs from './BreadrCrumbs/BreadCrumbs';
import Footer from './Footer/Footer';
import Header from './Header/Header';

const Layout = () => {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <BreadCrumbs />
      <div style={{
        height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}
      >
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
