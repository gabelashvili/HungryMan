import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../../components/shared/Button';
import TextField from '../../components/shared/TextField';
import { useSelector } from '../../hooks/useSelector';
import { updateUserInfo } from '../../store/ducks/userDuck';

const PersonalInfo = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const user = useSelector((state) => state.userReducer.user);
  const [values, setValues] = useState<ValuesTypes >({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
  });
  const disableSaveBtn = () => {
    let disable = false;
    if (user?.identificationCode) {
      Object.keys(values).forEach((el) => {
        if (!values[el as keyof ValuesTypes]) {
          disable = true;
        }
      });
    }
    disable = !(values.firstName && values.lastName && values.email && values.phone);
    return disable;
  };

  const handleSave = () => {
    if (!disableSaveBtn()) {
      let data = null;
      if (user?.identificationCode) {
        data = values;
      } else {
        data = {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phone: values.phone,
        };
      }
      setLoading(true);
      dispatch(updateUserInfo(data, { success: () => setLoading(false), error: () => setLoading(false) }));
    }
  };

  useEffect(() => {
    if (user) {
      setValues({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        address: user.address,
        city: user.city,
      });
    }
  }, [user]);

  return (
    <>
      <div className="panel--header with-border">
        <h3 className="panel--title">პერსონალური ინფორმაცია</h3>
      </div>
      <div className="panel--content">
        <form className="user-dashboard--form">
          <TextField
            inputName="firstName"
            label="სახელი"
            value={values?.firstName}
            handleChange={(firstName) => setValues({ ...values, firstName })}
          />
          <TextField
            inputName="lastName"
            label="გვარი"
            value={values?.lastName}
            handleChange={(lastName) => setValues({ ...values, lastName })}
          />
          <TextField
            inputName="email"
            label="ელ.ფოსტა"
            value={values?.email}
            handleChange={(email) => setValues({ ...values, email })}
          />
          <TextField
            inputName="phone"
            label="მობილურის ნომერი"
            value={values?.phone}
            handleChange={(phone) => setValues({ ...values, phone })}
          />
          {user?.identificationCode && (
            <>
              <TextField
                inputName="companyName"
                label="კომპანიის სახელი"
                value={user.companyName}
                disabled
              />
              <TextField
                inputName="identificationCode"
                label=" საიდ. კოდი"
                value={user.identificationCode}
                disabled
              />
              <TextField
                inputName="city"
                label="ქალაქი"
                value={values.city}
                handleChange={(city) => setValues({ ...values, city })}
              />
              <TextField
                inputName="address"
                label="მისამართი"
                value={values.address}
                handleChange={(address) => setValues({ ...values, address })}
              />

            </>
          )}

        </form>
      </div>
      <div className="panel--footer">
        <Button
          type="secondary"
          loading={loading}
          classes="ml-auto"
          handleClick={handleSave}
          disabled={disableSaveBtn()}
        >
          დამახსოვრება
        </Button>
      </div>
    </>
  );
};

export default PersonalInfo;

interface ValuesTypes {
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  address: string,
  city: string,
}
