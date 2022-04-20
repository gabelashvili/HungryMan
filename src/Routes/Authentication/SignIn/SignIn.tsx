import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/shared/Button';
import TextField from '../../../components/shared/TextField';
import './sign-in.scss';

const SignIn = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

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
          <TextField label="ელ.ფოსტა" value={values.email} inputName="email" handleChange={(email) => setValues({ ...values, email })} />
        </div>
        <div className="form__group">
          <TextField
            type="password"
            label="პაროლი"
            value={values.email}
            inputName="password"
            handleChange={(password) => setValues({ ...values, password })}
          />
        </div>
      </form>
      <div className="sign-in--form-controls">
        <Button handleClick={() => console.log('clicked')} type="primary">ავტორიზაცია</Button>
        <Button handleClick={() => console.log('clicked')} type="text">დაგავიწყდა პაროლი?</Button>
      </div>
    </div>
  );
};

export default SignIn;
