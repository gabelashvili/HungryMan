import { Outlet } from 'react-router-dom';
// import BreadCrumbs from './BreadrCrumbs/BreadCrumbs';
import Header from './Header/Header';

const Layout = () => {
  return (
    <div>
      <Header />
      {/* <BreadCrumbs /> */}
      <Outlet />
    </div>
  );
};

export default Layout;
