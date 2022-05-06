import { Outlet } from 'react-router-dom';
import Banner from '../../assets/images/auth-banner.png';
import Logo from '../../assets/images/logo.png';
import './authentication.scss';

const Authentication = () => {
  return (
    <div className="popup">
      <div className="popup--content">
        <div className="popup--wrapper">
          <a href="/" className="popup--logo">
            <picture>
              <img src={Logo} alt="HungryMan" />
            </picture>
          </a>
          <Outlet />
        </div>
      </div>
      <div className="popup--banner">
        <img
          src={Banner}
          alt="Banner"
          className="popup--image"
        />
      </div>
    </div>
  );
};

export default Authentication;
