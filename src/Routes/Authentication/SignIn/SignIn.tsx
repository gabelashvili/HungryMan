import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '../../../components/shared/Button';
import TextField from '../../../components/shared/TextField';
import { signIn } from '../../../store/ducks/authDuck';
import { UserAuthParams } from '../../../types/auth';

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [values, setValues] = useState<UserAuthParams>({
    phoneOrEmail: '',
    password: '',
  });

  const handleClick = () => {
    setLoading(true);
    dispatch(signIn(values, { success: () => setLoading(false), error: () => setLoading(false) }));
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
          <TextField label="ელ.ფოსტა ან მობილური" value={values.phoneOrEmail} inputName="email" handleChange={(phoneOrEmail) => setValues({ ...values, phoneOrEmail })} />
        </div>
        <div className="form__group">
          <TextField
            type="password"
            label="პაროლი"
            value={values.password}
            inputName="password"
            handleChange={(password) => setValues({ ...values, password })}
          />
        </div>
      </form>
      <div className="popup--form-controls">
        <Button loading={loading} handleClick={handleClick} type="primary">ავტორიზაცია</Button>
        <Button handleClick={() => console.log('clicked')} type="text">დაგავიწყდა პაროლი?</Button>
      </div>
    </>
  );
};

export default SignIn;
