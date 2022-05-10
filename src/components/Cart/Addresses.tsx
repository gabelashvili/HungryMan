const Addresses = () => {
  return (
    <>
      <h4 className="panel--title">აირჩიე მისამართი</h4>
      <div className="radio-list">
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
    </>
  );
};

export default Addresses;
