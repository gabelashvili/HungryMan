import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../../components/shared/Button';
import TextField from '../../components/shared/TextField';
import { reqPasswordRecover } from '../../store/ducks/userDuck';

const RecoverPassword = () => {
  const dispatch = useDispatch();
  const [phoneOrEmail, setPhoneOrEmail] = useState<string>('');
  const [isSend, setSend] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = () => {
    if (!isSend) {
      setLoading(true);
      dispatch(reqPasswordRecover(phoneOrEmail, {
        success: () => {
          setLoading(false);
          setSend(true);
        },
        error: () => setLoading(false),
      }));
    }
  };
  return (
    <>
      <div className="popup--heading">
        <h2>დაგავიწყდა პაროლი?</h2>
        <p>
          პაროლის აღდგენის პროცესი გამოიგზავნება ელ.ფოსტაზე
        </p>
      </div>
      <form className="popup--form">
        <div className="form__group">
          <TextField
            label="ელ.ფოსტა ან მობილური"
            value={phoneOrEmail}
            inputName="email"
            handleChange={(phoneOrEmail) => setPhoneOrEmail(phoneOrEmail)}
          />
        </div>
      </form>
      {isSend && <p className="popup--recover-succeed">პაროლის აღსადგენად შეამოწმეთ თქვენი ელ.ფოსტა</p>}
      <div className="popup--form-controls">
        <Button handleClick={handleClick} loading={loading} type="primary">გაგზავნა</Button>
      </div>
    </>
  );
};

export default RecoverPassword;
