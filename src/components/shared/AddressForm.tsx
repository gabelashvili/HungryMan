import { AddressType } from '../../types/user';

const AddressForm = ({
  data, checked, handleClick, name,
}:
   {data: AddressType, checked?: boolean, handleClick?: (data: any)=> void, name: string}) => {
  return (
    <div className="form__group">
      <label
        className="input--radio radio-selector"
        htmlFor={name}
      >
        <input type="radio" id={name} name="address" checked={checked} onChange={() => handleClick && handleClick(data)} />
        <div className="address-info">
          <h5 className="address--name">{data.city}</h5>
          <p className="address--description">
            {data.address}
          </p>
        </div>
        <span className="radio-box">
          <span className="radio-marker" />
        </span>
      </label>
    </div>
  );
};

export default AddressForm;
