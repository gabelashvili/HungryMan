import CartProductsList from '../../../components/Cart/CartProductsList';
import './cart.scss';

const Cart = () => {
  return (
    <div className="wrapper">
      <CartProductsList />
      <div className="panel without-header cart-form">
        <div className="panel--content">
          <h4 className="panel--title">აირჩიე მისამართი</h4>
          <div className="radio-list">
            <div className="form__group">
              <label className="input--radio radio-selector" htmlFor="address-1">
                <input type="radio" id="address-1" name="address" />
                <div className="address-info">
                  <h5 className="address--name">თბილისი</h5>
                  <p className="address--description">
                    ვაჟა-ფშაველას გამზირი N102, კვ.6 / სართ 8
                  </p>
                </div>
                <span className="radio-box">
                  <span className="radio-marker" />
                </span>
              </label>
            </div>
            <div className="form__group">
              <label className="input--radio radio-selector" htmlFor="address-2">
                <input type="radio" id="address-2" name="address" />
                <div className="address-info">
                  <h5 className="address--name">თბილისი</h5>
                  <p className="address--description">
                    ვაჟა-ფშაველას გამზირი N102, კვ.6 / სართ 8
                  </p>
                </div>
                <span className="radio-box">
                  <span className="radio-marker" />
                </span>
              </label>
            </div>
          </div>
          <button className="button button--icon-left button--secondary">
            <svg fill="none" viewBox="0 0 14 14">
              <path fill="currentColor" d="M6 6V0h2v6h6v2H8v6H6V8H0V6h6Z" />
            </svg>
            მისამართის დამატება
          </button>
          <h4 className="panel--title">აირჩიე გადახდის მეთოდი</h4>
          <div className="radio-list">
            <div className="form__group">
              <label className="input--radio radio-selector" htmlFor="payment-1">
                <input type="radio" id="payment-1" name="payment" />
                <div className="payment-image--list">
                  <picture className="payment-image">
                    <img src="http://localhost:4200/assets/images/hat.png" alt="payment" />
                  </picture>
                </div>
                <span className="radio-title">Paypal</span>
                <span className="radio-box">
                  <span className="radio-marker" />
                </span>
              </label>
            </div>
            <div className="form__group">
              <label className="input--radio radio-selector" htmlFor="payment-2">
                <input type="radio" id="payment-2" name="payment" />
                <div className="payment-image--list">
                  <picture className="payment-image">
                    <img src="../../../assets/images/hat.png" alt="payment" />
                  </picture>
                  <picture className="payment-image">
                    <img src="../../../assets/images/hat.png" alt="payment" />
                  </picture>
                </div>
                <span className="radio-title">ბარათით</span>
                <span className="radio-box">
                  <span className="radio-marker" />
                </span>
              </label>
            </div>
          </div>
        </div>
        <div className="panel--footer">
          <div className="cart-details">
            <h4 className="cart-details--title">შეკვეთის დეტალები</h4>
            <div className="cart-details--item">
              <span className="cart-details--name">პროდუქტის ღირებულება</span>
              <span className="cart-details--value">1050.00₾</span>
            </div>
            <div className="cart-details--item">
              <span className="cart-details--name">პროდუქტის ღირებულება</span>
              <span className="cart-details--value">1050.00₾</span>
            </div>
            <div className="cart-details--sum">
              <span className="cart-details--sum__name">ჯამი</span>
              <span className="cart-details--sum__value">1050.00₾</span>
            </div>
            <button className="button button--primary">შეკვეთის გაფორმება</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
