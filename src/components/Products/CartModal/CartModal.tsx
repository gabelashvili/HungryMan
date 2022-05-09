import clsx from 'clsx';
import {
  Dispatch, SetStateAction, useEffect, useState,
} from 'react';
import ClearIcon from '../../../Icons/ClearIcon';
import Button from '../../shared/Button';
import Tab from '../../shared/Tab/Tab';
import './cart-modal.scss';
import CartCoubs from './CartCoubs';
import CartProducts from './CartProducts';
import EmptyCard from './EmptyCard';

const CartModal = ({ show, setShow }: PropsTypes) => {
  const [selectedTab, setSelectedTab] = useState<number>(0);

  useEffect(() => {
    document.body.style.overflow = show ? 'hidden' : '';
  }, [show]);
  return (
    <>
      <div className={clsx('modal modal--right', show && 'is-active')}>
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
          {selectedTab === 0 ? <CartCoubs /> : <CartProducts />}
          {/* <EmptyCard  /> */}
        </div>

        <div className="modal--footer">
          <div className="cart-modal--details">
            <span>ჯამური თანხა:</span>
            1400,50.00₾
          </div>
          <button className="button button--primary">ყიდვა</button>
        </div>
      </div>

      <div className="overlay" />
    </>
  );
};

export default CartModal;

const tabs = [
  {
    label: 'უჯრები',
    value: 0,
    counter: 12,
  },
  {
    label: 'პროდუქცია',
    value: 1,
  },
];

interface PropsTypes {
    show: boolean,
    setShow: Dispatch<SetStateAction<boolean>>
}
