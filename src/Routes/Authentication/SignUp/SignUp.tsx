import clsx from 'clsx';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/shared/Button';
import TextField from '../../../components/shared/TextField';
import { CompanySignUpParams, IndividualUserSignUpParams } from '../../../types/auth';
import './sign-up.scss';

const SignUp = () => {
  const [selectedType, setSelectedType] = useState<1 | 2>(1);
  const [step, setStep] = useState<1 | 2>(1);
  const [repeatPassword, setRepeatPassword] = useState<string>('');
  const [values, setValues] = useState<IndividualUserSignUpParams>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
  });
  const [companyInfo, setCompanyInfo] = useState<CompanySignUpParams>(companyInfoInitialState);

  const handleRegister = () => {
    console.log('register');
  };

  return (
    <div className="sign-up">
      <div className="sign-up--heading">
        <h2>რეგისტრაცია</h2>
        <p>
          უკვე ხარ რეგისტრირებული? გაიარე
          <Link to="/" className="link sign-up--auth">ავტორიზაცია</Link>
        </p>
      </div>
      <div className="register-tab">
        <div
          className={clsx('register-tab--item', selectedType === 1 && 'is-active')}
          onClick={() => {
            setSelectedType(1);
            setCompanyInfo(companyInfoInitialState);
            setStep(1);
          }}
        >
          <span> ფიზიკური პირი </span>
        </div>
        <div
          className={clsx('register-tab--item', selectedType === 2 && 'is-active')}
          onClick={() => setSelectedType(2)}
        >
          <span>იურიდიული პირი</span>
        </div>
      </div>
      <form className="sign-up--form">
        {selectedType === 2 && step === 1 ? (
          <>
            <TextField label="სახელი" inputName="firstName" value={values.firstName} handleChange={(firstName) => setValues({ ...values, firstName })} />
            <TextField label="გვარი" inputName="lastName" value={values.lastName} handleChange={(lastName) => setValues({ ...values, lastName })} />
            <TextField label="ელ.ფოსტა" inputName="email" value={values.email} handleChange={(email) => setValues({ ...values, email })} />
            <TextField label="მობილურის ნომერი" inputName="phone" value={values.phone} handleChange={(phone) => setValues({ ...values, phone })} />
            <TextField
              type="password"
              label="პაროლი"
              inputName="password"
              value={values.password}
              handleChange={(password) => setValues({ ...values, password })}
            />
            <TextField
              type="password"
              label="გაიმეორე პაროლი"
              inputName="repeatPassword"
              value={repeatPassword}
              handleChange={(repeatPassword) => setRepeatPassword(repeatPassword)}
            />
          </>
        ) : (
          <>
            <TextField
              label="კომპანიის სახელი"
              inputName="companyName"
              value={companyInfo.companyName}
              handleChange={(companyName) => setCompanyInfo({ ...companyInfo, companyName })}
            />
            <TextField
              label="საიდენტიფიკაციო კოდი"
              inputName="identificationCode"
              value={companyInfo.identificationCode}
              handleChange={(identificationCode) => setCompanyInfo({ ...companyInfo, identificationCode })}
            />
            <TextField
              label="ქალაქი"
              inputName="city"
              value={companyInfo.city}
              handleChange={(city) => setCompanyInfo({ ...companyInfo, city })}
            />
            <TextField
              label="მისამართი"
              inputName="address"
              value={companyInfo.address}
              handleChange={(address) => setCompanyInfo({ ...companyInfo, address })}
            />
          </>
        )}
        <div className="form__group">
          <label className="input--checkbox" htmlFor="terms">
            <input type="checkbox" id="terms" />
            <span className="checkbox-box">
              <span className="checkbox-marker" />
            </span>
            <span className="checkbox-title">
              ვეთანხმები მოცემულ
              <a href="" className="link">წესებს და პირობებს</a>
            </span>
          </label>
        </div>
      </form>
      <div className="sign-up--form-controls">
        <Button
          handleClick={() => (selectedType === 2 && step === 1 ? setStep(2) : handleRegister)}
          type="primary"
        >
          {selectedType === 2 && step === 1 ? 'შემდეგი' : 'რეგისტრაცია'}
        </Button>
      </div>
    </div>

  );
};

export default SignUp;

const companyInfoInitialState: CompanySignUpParams = {
  companyName: '',
  identificationCode: '',
  city: '',
  address: '',
};
