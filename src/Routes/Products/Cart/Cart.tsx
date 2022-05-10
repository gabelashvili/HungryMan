import './cart.scss';

const Cart = () => {
  return (
    <div className="wrapper">
      <div className="panel cart">
        <div className="panel--header with-border">
          <h3 className="panel--title">კალათის გვერდი</h3>
        </div>
        <div className="panel--content">
          <ul className="product--list large">
            {/* <!-- add 'large' for inline cart  --> */}
            <li className="product--item">
              <picture className="product--image">
                <img src="../../../assets/images/hat.png" alt="item" />
              </picture>

              <div className="product--details">
                <h4>ჰანგრიმენის ნაცრისფერი საწვიმარი</h4>
                <p>
                  თორნიკე ჭყონია - თორნიკე - იდეების გენერატორი და ფულის უაზროდ
                  მფლანგველი, მეგობრობს შავ იუმორთან, უყვარს...
                </p>
                <span>250.00₾</span>
              </div>

              <div className="product--options">
                <div className="count-selector">
                  <button className="count-selector--button">
                    <svg width="14" height="2" viewBox="0 0 14 2" fill="none">
                      <rect width="14" height="2" fill="currentColor" />
                    </svg>
                  </button>
                  <span className="count-selector--value">1</span>
                  <button className="count-selector--button">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M6 6V0H8V6H14V8H8V14H6V8H0V6H6Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </div>

                <button className="button button--icon">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.00072 5.58599L11.9507 0.635986L13.3647 2.04999L8.41472 6.99999L13.3647 11.95L11.9507 13.364L7.00072 8.41399L2.05072 13.364L0.636719 11.95L5.58672 6.99999L0.636719 2.04999L2.05072 0.635986L7.00072 5.58599Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </div>
            </li>

            <li className="product--item">
              <picture className="product--image">
                <img src="../../../assets/images/hat.png" alt="item" />
              </picture>

              <div className="product--details">
                <h4>ჰანგრიმენის ნაცრისფერი საწვიმარი</h4>
                <p>
                  თორნიკე ჭყონია - თორნიკე - იდეების გენერატორი და ფულის უაზროდ
                  მფლანგველი, მეგობრობს შავ იუმორთან, უყვარს...
                </p>
                <span>250.00₾</span>
              </div>

              <div className="product--options">
                <div className="count-selector">
                  <button className="count-selector--button">
                    <svg width="14" height="2" viewBox="0 0 14 2" fill="none">
                      <rect width="14" height="2" fill="currentColor" />
                    </svg>
                  </button>
                  <span className="count-selector--value">1</span>
                  <button className="count-selector--button">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M6 6V0H8V6H14V8H8V14H6V8H0V6H6Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </div>

                <button className="button button--icon">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.00072 5.58599L11.9507 0.635986L13.3647 2.04999L8.41472 6.99999L13.3647 11.95L11.9507 13.364L7.00072 8.41399L2.05072 13.364L0.636719 11.95L5.58672 6.99999L0.636719 2.04999L2.05072 0.635986L7.00072 5.58599Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </div>
            </li>

            <li className="product--item">
              <picture className="product--image">
                <img src="../../../assets/images/hat.png" alt="item" />
              </picture>

              <div className="product--details">
                <h4>ჰანგრიმენის ნაცრისფერი საწვიმარი</h4>
                <p>
                  თორნიკე ჭყონია - თორნიკე - იდეების გენერატორი და ფულის უაზროდ
                  მფლანგველი, მეგობრობს შავ იუმორთან, უყვარს...
                </p>
                <span>250.00₾</span>
              </div>

              <div className="product--options">
                <div className="count-selector">
                  <button className="count-selector--button">
                    <svg width="14" height="2" viewBox="0 0 14 2" fill="none">
                      <rect width="14" height="2" fill="currentColor" />
                    </svg>
                  </button>
                  <span className="count-selector--value">1</span>
                  <button className="count-selector--button">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M6 6V0H8V6H14V8H8V14H6V8H0V6H6Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </div>

                <button className="button button--icon">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.00072 5.58599L11.9507 0.635986L13.3647 2.04999L8.41472 6.99999L13.3647 11.95L11.9507 13.364L7.00072 8.41399L2.05072 13.364L0.636719 11.95L5.58672 6.99999L0.636719 2.04999L2.05072 0.635986L7.00072 5.58599Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </div>
            </li>

            <li className="product--item">
              <picture className="product--image">
                <img src="../../../assets/images/hat.png" alt="item" />
              </picture>

              <div className="product--details">
                <h4>ჰანგრიმენის ნაცრისფერი საწვიმარი</h4>
                <p>
                  თორნიკე ჭყონია - თორნიკე - იდეების გენერატორი და ფულის უაზროდ
                  მფლანგველი, მეგობრობს შავ იუმორთან, უყვარს...
                </p>
                <span>250.00₾</span>
              </div>

              <div className="product--options">
                <div className="count-selector">
                  <button className="count-selector--button">
                    <svg width="14" height="2" viewBox="0 0 14 2" fill="none">
                      <rect width="14" height="2" fill="currentColor" />
                    </svg>
                  </button>
                  <span className="count-selector--value">1</span>
                  <button className="count-selector--button">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M6 6V0H8V6H14V8H8V14H6V8H0V6H6Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </div>

                <button className="button button--icon">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.00072 5.58599L11.9507 0.635986L13.3647 2.04999L8.41472 6.99999L13.3647 11.95L11.9507 13.364L7.00072 8.41399L2.05072 13.364L0.636719 11.95L5.58672 6.99999L0.636719 2.04999L2.05072 0.635986L7.00072 5.58599Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </div>
            </li>

            <li className="product--item">
              <picture className="product--image">
                <img src="../../../assets/images/hat.png" alt="item" />
              </picture>

              <div className="product--details">
                <h4>ჰანგრიმენის ნაცრისფერი საწვიმარი</h4>
                <p>
                  თორნიკე ჭყონია - თორნიკე - იდეების გენერატორი და ფულის უაზროდ
                  მფლანგველი, მეგობრობს შავ იუმორთან, უყვარს...
                </p>
                <span>250.00₾</span>
              </div>

              <div className="product--options">
                <div className="count-selector">
                  <button className="count-selector--button">
                    <svg width="14" height="2" viewBox="0 0 14 2" fill="none">
                      <rect width="14" height="2" fill="currentColor" />
                    </svg>
                  </button>
                  <span className="count-selector--value">1</span>
                  <button className="count-selector--button">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M6 6V0H8V6H14V8H8V14H6V8H0V6H6Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </div>

                <button className="button button--icon">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.00072 5.58599L11.9507 0.635986L13.3647 2.04999L8.41472 6.99999L13.3647 11.95L11.9507 13.364L7.00072 8.41399L2.05072 13.364L0.636719 11.95L5.58672 6.99999L0.636719 2.04999L2.05072 0.635986L7.00072 5.58599Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </div>
            </li>

            <li className="product--item">
              <picture className="product--image">
                <img src="../../../assets/images/hat.png" alt="item" />
              </picture>

              <div className="product--details">
                <h4>ჰანგრიმენის ნაცრისფერი საწვიმარი</h4>
                <p>
                  თორნიკე ჭყონია - თორნიკე - იდეების გენერატორი და ფულის უაზროდ
                  მფლანგველი, მეგობრობს შავ იუმორთან, უყვარს...
                </p>
                <span>250.00₾</span>
              </div>

              <div className="product--options">
                <div className="count-selector">
                  <button className="count-selector--button">
                    <svg width="14" height="2" viewBox="0 0 14 2" fill="none">
                      <rect width="14" height="2" fill="currentColor" />
                    </svg>
                  </button>
                  <span className="count-selector--value">1</span>
                  <button className="count-selector--button">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M6 6V0H8V6H14V8H8V14H6V8H0V6H6Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </div>

                <button className="button button--icon">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.00072 5.58599L11.9507 0.635986L13.3647 2.04999L8.41472 6.99999L13.3647 11.95L11.9507 13.364L7.00072 8.41399L2.05072 13.364L0.636719 11.95L5.58672 6.99999L0.636719 2.04999L2.05072 0.635986L7.00072 5.58599Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </div>
            </li>

            <li className="product--item">
              <picture className="product--image">
                <img src="../../../assets/images/hat.png" alt="item" />
              </picture>

              <div className="product--details">
                <h4>ჰანგრიმენის ნაცრისფერი საწვიმარი</h4>
                <p>
                  თორნიკე ჭყონია - თორნიკე - იდეების გენერატორი და ფულის უაზროდ
                  მფლანგველი, მეგობრობს შავ იუმორთან, უყვარს...
                </p>
                <span>250.00₾</span>
              </div>

              <div className="product--options">
                <div className="count-selector">
                  <button className="count-selector--button">
                    <svg width="14" height="2" viewBox="0 0 14 2" fill="none">
                      <rect width="14" height="2" fill="currentColor" />
                    </svg>
                  </button>
                  <span className="count-selector--value">1</span>
                  <button className="count-selector--button">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M6 6V0H8V6H14V8H8V14H6V8H0V6H6Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </div>

                <button className="button button--icon">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.00072 5.58599L11.9507 0.635986L13.3647 2.04999L8.41472 6.99999L13.3647 11.95L11.9507 13.364L7.00072 8.41399L2.05072 13.364L0.636719 11.95L5.58672 6.99999L0.636719 2.04999L2.05072 0.635986L7.00072 5.58599Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>

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
