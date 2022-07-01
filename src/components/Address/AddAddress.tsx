import { useState } from 'react';
import { useAppDispatch } from '../../hooks/useSelector';
import ClearIcon from '../../Icons/ClearIcon';
import { toggleModal } from '../../store/ducks/modalsDuck';
import { addUserAddress, clearUserAddresses } from '../../store/ducks/userDuck';
import { AddAddressParams } from '../../types/user';
import Button from '../shared/Button';
import TextField from '../shared/TextField';

const AddAddress = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [values, setValues] = useState<AddAddressParams>({
    city: '',
    address: '',
  });

  const handleAdd = () => {
    setLoading(true);
    dispatch(addUserAddress(values, {
      success: () => {
        setLoading(false);
        dispatch(clearUserAddresses());
        dispatch(toggleModal({ key: 'addAddress', open: false }));
      },
      error: () => setLoading(false),
    }));
  };
  return (
    <>
      <div className="modal modal--small">
        <div className="modal--header">
          <h3 className="modal--title">ახალი მისამართი</h3>
          <Button
            handleClick={() => dispatch(toggleModal({ key: 'addAddress', open: false }))}
            classes="button--icon is-rounded button-pull-right"
            type="text"
          >
            <ClearIcon />
          </Button>
        </div>

        <div className="modal--content">
          <TextField
            value={values.city}
            handleChange={(city) => setValues({ ...values, city })}
            label="ქალაქი"
            inputName="city"
          />
          <br />
          <TextField
            value={values.address}
            handleChange={(address) => setValues({ ...values, address })}
            label="მისამართი"
            inputName="address"
          />
          <br />
          <Button
            disabled={!values.city || !values.address}
            loading={loading}
            handleClick={handleAdd}
            type="primary"
          >
            მისამართის დამატება

          </Button>
        </div>
      </div>

      <div className="overlay" />
    </>
  );
};

export default AddAddress;
