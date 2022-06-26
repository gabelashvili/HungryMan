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
          ) : <Button handleClick={() => navigate('/auth')} type="secondary">ავტორიზაცია</Button>}
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
