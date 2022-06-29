import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Addresses from '../../../components/Address/Addresses';
import CartProductsList from '../../../components/Products/Cart/CartProductsList';
import PaymentMethod from '../../../components/shared/PaymentMethod';
import Button from '../../../components/shared/Button';
import { useAppDispatch, useSelector } from '../../../hooks/useSelector';
import { purchaseProductCartItem } from '../../../store/ducks/productsDuck';
import { FormattedItemsDetails } from '../../../types/products';
import { AddressType } from '../../../types/user';

const Cart = () => {
  const dispatch = useAppDispatch();
  const addresses = useSelector((state) => state.userReducer.addresses);
  const items = useSelector((state) => state.productsReducer.selectedProductsCart);
  const totalPrice = items.reduce((acc, cur) => acc + cur.count * cur.product.newPrice, 0);
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handlePurchaseItems = () => {
    if (!selectedAddress) {
      toast.error('დაამატეთ მისამართი');
    }
    setLoading(true);
    const products = items.reduce(
      (acc: FormattedItemsDetails[], cur): FormattedItemsDetails[] => [...acc, ...new Array(cur.count as number)
        .fill({
          id: cur.product.itemDetails[0].id,
          count: cur.count,
        })],
      [],
    );
    selectedAddress
    && dispatch(purchaseProductCartItem(
      { itemDetails: products, userAddressId: selectedAddress },
      {
        success: (url: string) => {
          window.location.href = url;
        },
      },
    ));
  };

  useEffect(() => {
    if (addresses && addresses?.length > 0 && !selectedAddress) {
      setSelectedAddress(addresses[0].id);
    }
  }, [addresses, selectedAddress]);

  return (
    <div className="cart">
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
                  ₾
                </span>
              </div>
              <div className="cart-details--sum">
                <span className="cart-details--sum__name">ჯამი</span>
                <span className="cart-details--sum__value">
                  {totalPrice.toFixed(2)}
                  ₾
                </span>
              </div>
              <Button
                loading={loading}
                handleClick={handlePurchaseItems}
                disabled={addresses?.length === 0 || items.length === 0}
              >
                შეკვეთის გაფორმება

              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
