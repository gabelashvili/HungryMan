import { Outlet } from 'react-router-dom';
import UserMenu from '../../components/Header/UserMenu/UserMenu';
import './user-dashboard.scss';

const UserDashboard = () => {
  return (
    <div className="wrapper user-dashboard">
      <UserMenu open isRelative />
      <div className="user-dashboard--content">
        <div className="panel">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
