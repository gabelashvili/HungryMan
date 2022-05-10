import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Banner from '../../assets/images/auth-banner.png';
import Logo from '../../assets/images/logo.png';
import { useSelector } from '../../hooks/useSelector';
import './authentication.scss';

const Authentication = () => {
  const navigate = useNavigate();
  const isUserAuthed = useSelector((state) => state.userReducer.user?.id);

  useEffect(() => {
    if (isUserAuthed) {
      navigate('/products');
    }
  }, [isUserAuthed]);
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
