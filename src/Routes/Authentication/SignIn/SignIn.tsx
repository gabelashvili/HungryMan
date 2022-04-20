import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '../../../components/shared/Button';
import TextField from '../../../components/shared/TextField';
import { signIn } from '../../../store/ducks/authDuck';
import { UserAuthParams } from '../../../types/auth';
import './sign-in.scss';

const SignIn = () => {
  const dispatch = useDispatch();
  const [values, setValues] = useState<UserAuthParams>({
    phoneOrEmail: '',
    password: '',
  });

  const handleClick = () => {
    dispatch(signIn(values));
  };

  return (
    <div className="sign-in">
      <div className="sign-in--heading">
        <h2>ავტორიზაცია</h2>
        <p>
          არ ხარ ჩვენი გუნდის წევრი? გაიარე
          <Link to="sign-up" className="link sign-in--register">რეგისტრაცია</Link>
        </p>
      </div>
      <form className="sign-in--form">
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
      <div className="sign-in--form-controls">
        <Button handleClick={handleClick} type="primary">ავტორიზაცია</Button>
        <Button handleClick={() => console.log('clicked')} type="text">დაგავიწყდა პაროლი?</Button>
      </div>
    </div>
  );
};

export default SignIn;
