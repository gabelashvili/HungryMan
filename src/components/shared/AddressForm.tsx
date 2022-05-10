const AddressForm = () => {
  return (
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
  );
};

export default AddressForm;
