import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import { useSelector } from '../../hooks/useSelector';
import BasketIcon from '../../Icons/BasketIcon';
import Address from '../Address/Address';
import CartModal from '../Products/CartModal/CartModal';
import Button from '../shared/Button';
import './header.scss';
import SearchBar from './SearchBar/SearchBar';
import UserMenu from './UserMenu/UserMenu';

const Header = () => {
  const navigate = useNavigate();
  const isUserAuthed = useSelector((state) => state.userReducer.user?.id);
  const selectedProductsInCart = useSelector((state) => state.productsReducer.selectedProductsCart);
  const cubesPrice = useSelector((state) => state.cubesReducer.selectedCubesInfo?.totalPrice) || 0;
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);
  const [showCartModal, setShowCartModal] = useState<boolean>(false);
  const cartsTotalItem = () => {
    let total = 0;
    total += selectedProductsInCart.length;
    if (cubesPrice > 0) {
      total += 1;
    }
    return total;
  };
  return (
    <>
      <Address />
      <CartModal show={showCartModal} setShow={setShowCartModal} />
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
            </ul>
          </nav>
          <SearchBar showSearchBar={showSearchBar} setShowSearchBar={setShowSearchBar} />
          <Button type="icon" classes="is-rounded header-button" handleClick={() => setShowCartModal(!showCartModal)} id="show-cart-btn">
            <BasketIcon />
            {cartsTotalItem() > 0 && (
            <span className="cart-count">
              {cartsTotalItem()}
            </span>
            )}
          </Button>
          {isUserAuthed ? (
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
        </div>
      </header>
    </>
  );
};

export default Header;
