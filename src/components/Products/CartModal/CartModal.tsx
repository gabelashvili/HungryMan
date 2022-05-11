import clsx from 'clsx';
import {
  Dispatch, SetStateAction, useEffect, useRef, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import useOutsideClick from '../../../hooks/useOutsideClick';
import { useSelector } from '../../../hooks/useSelector';
import ClearIcon from '../../../Icons/ClearIcon';
import Button from '../../shared/Button';
import Tab from '../../shared/Tab/Tab';
import './cart-modal.scss';
import CartCoubs from './CartCoubs';
import CartProducts from './CartProducts';

const CartModal = ({ show, setShow }: PropsTypes) => {
  const navigate = useNavigate();
  const selectedProducts = useSelector((state) => state.productsReducer.selectedProductsCart);
  const isUserAuthed = useSelector((state) => state.userReducer.user);
  const cartRef = useRef<HTMLDivElement>(null);
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const tabs = [
    {
      label: 'უჯრები',
      value: 0,
    },
    {
      label: 'პროდუქცია',
      value: 1,
      counter: selectedProducts.length,
    },
  ];

  useOutsideClick({
    ref: cartRef,
    disabled: !show,
    handleOutsideClick: () => setShow(false),
  });

  useEffect(() => {
    document.body.style.overflow = show ? 'hidden' : '';
  }, [show]);

  return (
    <>
      <div ref={cartRef} className={clsx('modal modal--right', show && 'is-active')}>
        <div className="modal--header">
          <h3 className="modal--title">კალათა</h3>
          <Button type="text" classes="button--icon button-pull-right is-rounded" handleClick={() => setShow(false)}>
            <ClearIcon />
          </Button>
        </div>

        <div className="modal--content">
          <div className="cart-tab">
            <Tab tabs={tabs} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
          </div>
          {selectedTab === 0 ? <CartCoubs /> : <CartProducts data={selectedProducts} />}
        </div>

        <div className="modal--footer">
          <div className="cart-modal--details">
            <span>ჯამური თანხა:</span>
            {/* TODO: show price based on selected tab */}
            {selectedProducts.reduce((acc, cur) => acc + cur.product.newPrice * cur.count, 0).toFixed(2)}
            ლ
          </div>
          <Button
            type={!isUserAuthed ? 'secondary' : ''}
            disabled={Boolean(isUserAuthed && selectedProducts.length === 0)}
            handleClick={() => {
              navigate(isUserAuthed ? '/products/cart' : '/auth');
              setShow(false);
            }}
          >
            {isUserAuthed ? 'ყიდვა' : 'ავტორიზაცია'}
          </Button>
        </div>
      </div>
      {show && <div className="overlay" />}
    </>
  );
};

export default CartModal;

interface PropsTypes {
    show: boolean,
    setShow: Dispatch<SetStateAction<boolean>>
}
