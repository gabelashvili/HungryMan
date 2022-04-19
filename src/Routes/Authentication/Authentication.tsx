import { Outlet } from 'react-router-dom';
import Banner from '../../assets/images/auth-banner.png';
import Logo from '../../assets/images/logo.png';
import './authentication.scss';

const Authentication = () => {
  return (
    <div className="authentication">
      <div className="authentication--content">
        <div className="authentication--wrapper">
          <a href="/" className="authentication--logo">
            <picture>
              <img src={Logo} alt="HungryMan" />
            </picture>
          </a>
          <Outlet />
        </div>
      </div>
      <div className="authentication--banner">
        <img
          src={Banner}
          alt="Banner"
          className="authentication--image"
        />
      </div>
    </div>
  );
};

export default Authentication;
