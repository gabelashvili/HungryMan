import clsx from 'clsx';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import { useSelector } from '../../hooks/useSelector';
import BasketIcon from '../../Icons/BasketIcon';
import Button from '../shared/Button';
import './header.scss';
import SearchBar from './SearchBar/SearchBar';
import UserMenu from './UserMenu/UserMenu';

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.userReducer.user?.id);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);

  return (
    <header className="header">
      <div className="wrapper">
        <Link to="/" className="header-logo">
          <picture>
            <img src={Logo} alt="HungryMan" />
          </picture>
        </Link>
        <nav className="header-nav">
          <ul className={clsx('header-nav--list', showSearchBar && 'hidden')}>
            <li className="header-nav--item">
              <a href="" className="header-nav--link"> მთავარი </a>
            </li>
            <li className="header-nav--item">
              <a href="" className="header-nav--link"> ჩვენ შესახებ </a>
            </li>
            <li className="header-nav--item">
              <a href="" className="header-nav--link"> კონტაქტი </a>
            </li>
            <li className="header-nav--item">
              <a href="" className="header-nav--link"> როგორ ვიყიდო? </a>
            </li>
          </ul>
        </nav>
        <SearchBar showSearchBar={showSearchBar} setShowSearchBar={setShowSearchBar} />
        <button className="button button--icon-rounded">
          <BasketIcon />
          <span className="cart-count"> 5 </span>
        </button>
        {user ? (
          <div className="relative">
            <button id="show-user-menu" className="button button--icon user--icon" onClick={() => setShowMenu(!showMenu)}>
              <img
                src={Logo}
                alt="icon"
              />
            </button>
            <UserMenu handleClickOutside={() => setShowMenu(false)} open={showMenu} />
          </div>
        ) : (
          <Button type="none" classes="button--icon-left" handleClick={() => navigate('authentication')}>
            <svg fill="none" viewBox="0 0 20 20">
              <path
                fill="currentColor"
                d="M20 10c0-5.51-4.49-10-10-10S0 4.49 0 10c0 2.9 1.25 5.51 3.23 7.34 0 .01 0 .01-.01.02.1.1.22.18.32.27.06.05.11.1.17.14.18.15.38.29.57.43l.2.14c.19.13.39.25.6.36.07.04.15.09.22.13.2.11.41.21.63.3.08.04.16.08.24.11.22.09.44.17.66.24.08.03.16.06.24.08.24.07.48.13.72.19.07.02.14.04.22.05.28.06.56.1.85.13.04 0 .08.01.12.02.34.03.68.05 1.02.05.34 0 .68-.02 1.01-.05.04 0 .08-.01.12-.02.29-.03.57-.07.85-.13.07-.01.14-.04.22-.05.24-.06.49-.11.72-.19.08-.03.16-.06.24-.08.22-.08.45-.15.66-.24.08-.03.16-.07.24-.11.21-.09.42-.19.63-.3.08-.04.15-.09.22-.13.2-.12.4-.23.6-.36.07-.04.13-.09.2-.14.2-.14.39-.28.57-.43.06-.05.11-.1.17-.14.11-.09.22-.18.32-.27 0-.01 0-.01-.01-.02C18.75 15.51 20 12.9 20 10Zm-5.06 4.97c-2.71-1.82-7.15-1.82-9.88 0-.44.29-.8.63-1.1 1A8.48 8.48 0 0 1 1.5 10c0-4.69 3.81-8.5 8.5-8.5 4.69 0 8.5 3.81 8.5 8.5 0 2.32-.94 4.43-2.46 5.97-.29-.37-.66-.71-1.1-1Z"
              />
            </svg>
            შესვლა
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
