import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import BasketIcon from '../../Icons/BasketIcon';
import './header.scss';
import UserMenu from './UserMenu/UserMenu';

const Header = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  return (
    <header className="header">
      <div className="wrapper">
        <Link to="/" className="header-logo">
          <picture>
            <img src={Logo} alt="HungryMan" />
          </picture>
        </Link>
        <nav className="header-nav">
          <ul className="header-nav--list">
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
        {/* <app-search-bar /> */}
        <button className="button button--icon-rounded">
          <BasketIcon />
          <span className="cart-count"> 5 </span>
        </button>
        <div className="relative">
          <button id="show-user-menu" className="button button--icon user--icon" onClick={() => setShowMenu(!showMenu)}>
            <img
              src={Logo}
              alt="icon"
            />
          </button>
          <UserMenu handleClickOutside={() => setShowMenu(false)} open={showMenu} />
        </div>
      </div>
    </header>
  );
};

export default Header;
