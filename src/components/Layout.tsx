import { Outlet } from 'react-router-dom';
import BreadCrumbs from './BreadrCrumbs/BreadCrumbs';
import Header from './Header/Header';

const Layout = () => {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <BreadCrumbs />
      <Outlet />
    </div>
  );
};

export default Layout;
