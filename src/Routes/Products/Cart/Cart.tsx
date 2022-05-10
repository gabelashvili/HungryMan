import { useEffect, useState } from 'react';
import Addresses from '../../../components/Cart/Addresses';
import CartProductsList from '../../../components/Cart/CartProductsList';
import PaymentMethod from '../../../components/Cart/PaymentMethod';
import { useSelector } from '../../../hooks/useSelector';
import { AddressType } from '../../../types/user';
import './cart.scss';

const Cart = () => {
  const addresses = useSelector((state) => state.userReducer.addresses);
  const items = useSelector((state) => state.productsReducer.selectedProductsCart);
  const totalPrice = items.reduce((acc, cur) => acc + cur.count * cur.product.newPrice, 0);
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
  useEffect(() => {
    if (addresses && !selectedAddress) {
      setSelectedAddress(addresses[0].id);
    }
  }, [addresses, selectedAddress]);
  return (
    <div className="wrapper">
      <CartProductsList data={items} />
      <div className="panel without-header cart-form">
        <div className="panel--content">
          <Addresses
            selectedAddress={selectedAddress}
            setSelectedAddress={(data: AddressType) => setSelectedAddress(data.id)}
          />
          <PaymentMethod />
        </div>
        <div className="panel--footer">
          <div className="cart-details">
            <h4 className="cart-details--title">შეკვეთის დეტალები</h4>
            <div className="cart-details--item">
              <span className="cart-details--name">პროდუქტის ღირებულება</span>
              <span className="cart-details--value">
                {totalPrice.toFixed(2)}
                ლ
              </span>
            </div>
            <div className="cart-details--sum">
              <span className="cart-details--sum__name">ჯამი</span>
              <span className="cart-details--sum__value">
                {totalPrice.toFixed(2)}
                ლ
              </span>
            </div>
            <button className="button button--primary">შეკვეთის გაფორმება</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
