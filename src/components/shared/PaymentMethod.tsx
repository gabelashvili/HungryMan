// import Paypal from '../../assets/images/paypal.png';
import { Dispatch, SetStateAction } from 'react';
import MasterCard from '../../assets/images/mastercard.png';
import Visa from '../../assets/images/visa.png';
import { useSelector } from '../../hooks/useSelector';

const PaymentMethod = ({ mustGenerateInvoice, setMustGenerateInvoice }: {
  mustGenerateInvoice?:boolean, setMustGenerateInvoice?: Dispatch<SetStateAction<boolean>>
}) => {
  const user = useSelector((state) => state.userReducer.user);
  console.log(mustGenerateInvoice);
  return (
    <>
      <h4 className="panel--title">აირჩიე გადახდის მეთოდი</h4>
      <div className="radio-list">
        <div className="form__group" onClick={() => setMustGenerateInvoice && setMustGenerateInvoice(false)}>
          <label className="input--radio radio-selector" htmlFor="payment-2">
            <input type="radio" id="payment-2" name="payment" checked={!mustGenerateInvoice} />
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
        {user?.identificationCode && setMustGenerateInvoice && (
        <div className="form__group" onClick={() => setMustGenerateInvoice && setMustGenerateInvoice(true)}>
          <label className="input--radio radio-selector" htmlFor="invoice">
            <input type="radio" id="invoice" name="payment" checked={mustGenerateInvoice} />
            <span className="radio-title">ინვოისით გადახდა</span>
            <span className="radio-box">
              <span className="radio-marker" />
            </span>
          </label>
        </div>
        )}
      </div>
    </>
  );
};

export default PaymentMethod;
