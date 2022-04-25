import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/shared/Button';
import TextField from '../../components/shared/TextField';
import { signIn } from '../../store/ducks/userDuck';
import { UserAuthParams } from '../../types/user';

const SignIn = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [error, setError] = useState<boolean>(false);
  const [values, setValues] = useState<UserAuthParams>({
    phoneOrEmail: '',
    password: '',
  });

  const handleClick = () => {
    setLoading(true);
    dispatch(signIn(values, {
      success: () => setLoading(false),
      error: () => {
        setLoading(false);
        setError(true);
      },
    }));
  };

  return (
    <>
      <div className="popup--heading">
        <h2>ავტორიზაცია</h2>
        <p>
          არ ხარ ჩვენი გუნდის წევრი? გაიარე
          <Link to="sign-up" className="link popup--link">რეგისტრაცია</Link>
        </p>
      </div>
      <form className="popup--form">
        <div className="form__group">
          <TextField
            error={error}
            label="ელ.ფოსტა ან მობილური"
            value={values.phoneOrEmail}
            inputName="email"
            handleChange={(phoneOrEmail) => setValues({ ...values, phoneOrEmail })}
          />
        </div>
        <div className="form__group">
          <TextField
            type="password"
            error={error}
            label="პაროლი"
            value={values.password}
            inputName="password"
            handleChange={(password) => setValues({ ...values, password })}
          />
        </div>
        {error && <p className="popup--form-error">*ელ.ფოსტა ან პაროლი არასწორია</p>}
      </form>
      <div className="popup--form-controls">
        <Button disabled={!isInputsValid(values)} loading={loading} handleClick={handleClick} type="primary">ავტორიზაცია</Button>
        <Button handleClick={() => navigate('/recover-password')} type="text">დაგავიწყდა პაროლი?</Button>
      </div>
    </>
  );
};

export default SignIn;

const isInputsValid = (params: UserAuthParams) => params.password.length > 5 && params.phoneOrEmail.length > 3;
