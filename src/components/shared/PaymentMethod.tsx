// import Paypal from '../../assets/images/paypal.png';
import MasterCard from '../../assets/images/mastercard.png';
import Visa from '../../assets/images/visa.png';

const PaymentMethod = () => {
  return (
    <>
      <h4 className="panel--title">აირჩიე გადახდის მეთოდი</h4>
      <div className="radio-list">
        {/* <div className="form__group">
          <label className="input--radio radio-selector" htmlFor="payment-1">
            <input type="radio" id="payment-1" name="payment" />
            <div className="payment-image--list">
              <picture className="payment-image">
                <img src={Paypal} alt="payment" />
              </picture>
            </div>
            <span className="radio-title">Paypal</span>
            <span className="radio-box">
              <span className="radio-marker" />
            </span>
          </label>
        </div> */}
        <div className="form__group">
          <label className="input--radio radio-selector" htmlFor="payment-2">
            <input type="radio" id="payment-2" name="payment" defaultChecked />
            <div className="payment-image--list">
              <picture className="payment-image">
                <img src={MasterCard} alt="payment" />
              </picture>
              <picture className="payment-image">
                <img src={Visa} alt="payment" />
              </picture>
            </div>
            <span className="radio-title">ბარათით</span>
            <span className="radio-box">
              <span className="radio-marker" />
            </span>
          </label>
        </div>
      </div>
    </>
  );
};

export default PaymentMethod;
