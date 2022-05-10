import { useState } from 'react';
import PlusIcon from '../../Icons/PlusIcon';
import AddAddress from '../shared/AddAddress';
import Button from '../shared/Button';

const Addresses = () => {
  const [showAdd, setShowAdd] = useState<boolean>(false);
  return (
    <>
      <AddAddress show={showAdd} setShow={setShowAdd} />
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
      <Button handleClick={() => setShowAdd(true)} type="secondary" classes="button--icon-left ">
        <PlusIcon />
        მისამართის დამატება
      </Button>
    </>
  );
};

export default Addresses;
