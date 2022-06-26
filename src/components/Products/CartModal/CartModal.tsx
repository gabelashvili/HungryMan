/* eslint-disable no-nested-ternary */
import clsx from 'clsx';
import {
  useEffect, useRef, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useSelector } from '../../../hooks/useSelector';
import ClearIcon from '../../../Icons/ClearIcon';
import Button from '../../shared/Button';
import Tab from '../../shared/Tab/Tab';
import './cart-modal.scss';
import './gift-panel.scss';
import CartCoubsModal from './CartCoubsModal';
import CartProducts from './CartProducts';
import { toggleCartModal } from '../../../store/ducks/cartModalDuck';

const CartModal = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const show = useSelector((state) => state.cartModalReducer);
  const selectedProducts = useSelector((state) => state.productsReducer.selectedProductsCart);
  const cubesTotalPrice = useSelector((state) => state.cubesReducer.selectedCubesInfo?.totalPrice) || 0;
  const isUserAuthed = useSelector((state) => state.userReducer.user);
  const cartRef = useRef<HTMLDivElement>(null);
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const tabs = [
    {
      label: 'უჯრები',
      value: 0,
      counter: cubesTotalPrice > 0 ? 1 : 0,
    },
    {
      label: 'პროდუქცია',
      value: 1,
      counter: selectedProducts.length,
    },
  ];

  useEffect(() => {
    document.body.style.overflow = show ? 'hidden' : '';
    if (!show) {
      setSelectedTab(0);
    }
  }, [show]);

  return (
    <>
      <div ref={cartRef} className={clsx('modal modal--right', show && 'is-active')}>
        <div className="modal--header">
          <h3 className="modal--title">კალათა</h3>
          <Button type="text" classes="button--icon button-pull-right is-rounded" handleClick={() => dispatch(toggleCartModal())}>
            <ClearIcon />
          </Button>
        </div>

        <div className="modal--content">
          <div className="cart-tab">
            <Tab tabs={tabs} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
          </div>
          {selectedTab === 0 ? <CartCoubsModal /> : <CartProducts data={selectedProducts} />}
        </div>

        <div className="modal--footer">
          <div className="cart-modal--details">
            <span>ჯამური თანხა:</span>
            {selectedTab === 0 ? cubesTotalPrice
              : selectedProducts.reduce((acc, cur) => acc + cur.product.newPrice * cur.count, 0).toFixed(2)}
            ლ
          </div>
          <Button
            type={!isUserAuthed ? 'secondary' : ''}
            disabled={Boolean(isUserAuthed
               && ((selectedTab === 1 && selectedProducts.length === 0)
               || (selectedTab === 0 && cubesTotalPrice === 0)))}
            handleClick={() => {
              navigate(isUserAuthed ? `/${selectedTab === 0 ? 'cubes' : 'products'}/cart` : '/auth');
              dispatch(toggleCartModal());
            }}
          >
            {isUserAuthed ? selectedTab === 0 ? 'გაფორმება' : 'ყიდვა' : 'ავტორიზაცია'}
          </Button>
        </div>
      </div>
      {show && <div className="overlay" />}
    </>
  );
};

export default CartModal;
