import { Dispatch, SetStateAction, useState } from 'react';
import ClearIcon from '../../Icons/ClearIcon';
import Button from './Button';
import TextField from './TextField';

const AddAddress = ({ show, setShow }: {show: boolean, setShow: Dispatch<SetStateAction<boolean>>}) => {
  const [values, setValues] = useState<{
      address: string,
      city: string
  }>({
    city: '',
    address: '',
  });
  return (
    show ? (
      <>
        <div className="modal modal--small">
          <div className="modal--header">
            <h3 className="modal--title">ახალი მისამართი</h3>
            <Button id="add-address-btn" handleClick={() => setShow(false)} classes="button--icon is-rounded button-pull-right" type="text"><ClearIcon /></Button>
          </div>

          <div className="modal--content">
            <TextField value={values.city} handleChange={(city) => setValues({ ...values, city })} label="ქალაქი" inputName="city" />
            <br />
            <TextField value={values.address} handleChange={(address) => setValues({ ...values, address })} label="მისამართი" inputName="address" />
            <br />
            <Button handleClick={() => console.log('add')} type="primary">მისამართის დამატება</Button>
          </div>
        </div>

        <div className="overlay" />
      </>
    ) : null
  );
};

export default AddAddress;
