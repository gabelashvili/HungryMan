import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import { useAppDispatch, useSelector } from '../../hooks/useSelector';
import ArrowIcon from '../../Icons/ArrowIcon';
import BasketIcon from '../../Icons/BasketIcon';
import ClearIcon from '../../Icons/ClearIcon';
import { toggleCartModal } from '../../store/ducks/cartModalDuck';
import Address from '../Address/Address';
import CartModal from '../Products/CartModal/CartModal';
import Button from '../shared/Button';
import './header.scss';
import SearchBar from './SearchBar/SearchBar';
import UserMenu from './UserMenu/UserMenu';

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const authedUser = useSelector((state) => state.userReducer.user);
  const selectedProductsInCart = useSelector((state) => state.productsReducer.selectedProductsCart);
  const cubesPrice = useSelector((state) => state.cubesReducer.selectedCubesInfo?.totalPrice) || 0;
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showResponsiveMenu, setShowResponsiveMenu] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);
  const [showUserMenu, setShowUserMenu] = useState<boolean>(false);
  const responsiveMenuRef = useRef<HTMLDivElement>(null);
  const cartsTotalItem = () => {
    let total = 0;
    total += selectedProductsInCart.length;
    if (cubesPrice > 0) {
      total += 1;
    }
    return total;
  };

  const toggleResponsiveMenu = () => setShowResponsiveMenu(!showResponsiveMenu);

  const handleClickOutside = (e: MouseEvent) => {
    if (!responsiveMenuRef?.current?.contains(e.target as Node)) {
      showResponsiveMenu && toggleResponsiveMenu();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  });

  return (
    <>
      <Address />
      <CartModal />
      <header className="header">
        <div className="wrapper">
          <a href="/" className="header-logo">
            <picture>
              <img src={Logo} alt="HungryMan" />
            </picture>
          </a>
          <nav className="header-nav">
            <ul className="header-nav--list">
              <li className="header-nav--item">
                <Link to="cubes" className="header-nav--link">კედელი</Link>
              </li>
              <li className="header-nav--item">
                <Link to="products" className="header-nav--link">პროდუქტები</Link>
              </li>
              <li className="header-nav--item">
                <Link to="landing" className={clsx('header-nav--link', pathname.includes('landing') && 'is-active')}>ლენდინგი</Link>
              </li>
            </ul>
          </nav>
          <SearchBar showSearchBar={showSearchBar} setShowSearchBar={setShowSearchBar} />
          <Button type="icon" classes="is-rounded header-button" handleClick={() => dispatch(toggleCartModal())} id="show-cart-btn">
            <BasketIcon />
            {cartsTotalItem() > 0 && (
            <span className="cart-count">
              {cartsTotalItem()}
            </span>
            )}
          </Button>
          {authedUser?.id ? (
            <div className="relative">
              <Button id="show-user-menu" type="icon" classes="user--icon" handleClick={() => setShowMenu(!showMenu)}>
                <img
                  src={Logo}
                  alt="icon"
                />
              </Button>
              <UserMenu
                handleClose={() => setShowMenu(false)}
                open={showMenu}
              />
            </div>
          ) : (
            <Button type="secondary" classes="button button--icon-left" handleClick={() => navigate('/auth')}>
              <svg fill="none" viewBox="0 0 20 20">
                <path
                  fill="currentColor"
                  d="M20 10c0-5.51-4.49-10-10-10S0 4.49 0 10c0 2.9 1.25 5.51 3.23 7.34 0 .01 0 .01-.01.02.1.1.22.18.32.27.06.05.11.1.17.14.18.15.38.29.57.43l.2.14c.19.13.39.25.6.36.07.04.15.09.22.13.2.11.41.21.63.3.08.04.16.08.24.11.22.09.44.17.66.24.08.03.16.06.24.08.24.07.48.13.72.19.07.02.14.04.22.05.28.06.56.1.85.13.04 0 .08.01.12.02.34.03.68.05 1.02.05.34 0 .68-.02 1.01-.05.04 0 .08-.01.12-.02.29-.03.57-.07.85-.13.07-.01.14-.04.22-.05.24-.06.49-.11.72-.19.08-.03.16-.06.24-.08.22-.08.45-.15.66-.24.08-.03.16-.07.24-.11.21-.09.42-.19.63-.3.08-.04.15-.09.22-.13.2-.12.4-.23.6-.36.07-.04.13-.09.2-.14.2-.14.39-.28.57-.43.06-.05.11-.1.17-.14.11-.09.22-.18.32-.27 0-.01 0-.01-.01-.02C18.75 15.51 20 12.9 20 10Zm-5.06 4.97c-2.71-1.82-7.15-1.82-9.88 0-.44.29-.8.63-1.1 1A8.48 8.48 0 0 1 1.5 10c0-4.69 3.81-8.5 8.5-8.5 4.69 0 8.5 3.81 8.5 8.5 0 2.32-.94 4.43-2.46 5.97-.29-.37-.66-.71-1.1-1Z"
                />
              </svg>

              შესვლა
            </Button>
          )}
          <Button type="icon" classes="header-button burger-button" handleClick={toggleResponsiveMenu}>
            <svg fill="none" viewBox="0 0 22 16">
              <path
                fill="currentColor"
                d="M0 0h22v2H0V0Zm0 7h22v2H0V7Zm0 7h22v2H0v-2Z"
              />
            </svg>
          </Button>
          {/* responsive menu */}
          <div className={clsx('modal modal--right navigation-modal', showResponsiveMenu && 'is-active')} ref={responsiveMenuRef}>
            <div className="modal--header">
              <h3 className="modal--title">მენიუ</h3>
              <Button
                type="icon"
                classes=" is-rounded button-pull-right"
                handleClick={toggleResponsiveMenu}
              >
                <ClearIcon />
              </Button>
            </div>
            <div className="modal--content">
              <nav className="header-nav responsive">
                <ul className="header-nav--list">
                  <li className="header-nav--item">
                    <Link to="cubes" className={clsx('header-nav--link', pathname.includes('cube') && 'is-active')}>კედელი</Link>
                  </li>
                  <li className="header-nav--item">
                    <Link to="products" className={clsx('header-nav--link', pathname.includes('products') && 'is-active')}>პროდუქტები</Link>
                  </li>
                  <li className="header-nav--item">
                    <Link to="landing" className={clsx('header-nav--link', pathname.includes('landing') && 'is-active')}>ლენდინგი</Link>
                  </li>
                </ul>
              </nav>
              <div className={clsx('user-info', showUserMenu && 'is-active')} onClick={() => setShowUserMenu(!showUserMenu)}>
                <img
                  className="user-info--img"
                  src={Logo}
                  alt="icon"
                />
                {authedUser?.firstName || ''}
                <ArrowIcon className="user-info--arrow" />
              </div>
              {showUserMenu && <UserMenu open styles={{ position: 'initial' }} />}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
