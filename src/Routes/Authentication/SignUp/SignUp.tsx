import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '../../../components/shared/Button';
import Checkbox from '../../../components/shared/Checkbox';
import TextField from '../../../components/shared/TextField';
import validateInput from '../../../helpers/inputsValidations';
import { signUp } from '../../../store/ducks/authDuck';
import { CompanySignUpParams, UserSignUpParams } from '../../../types/auth';

const SignUp = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState<null | {[key:string]: string}>(null);
  const [selectedType, setSelectedType] = useState<1 | 2>(1);
  const [step, setStep] = useState<1 | 2>(1);
  const [repeatPassword, setRepeatPassword] = useState<{value: string, error: boolean}>({
    value: '',
    error: false,
  });
  const [acceptTerm, setAcceptTerm] = useState<boolean>(false);
  const [values, setValues] = useState<UserSignUpParams>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
  });
  const [companyInfo, setCompanyInfo] = useState<CompanySignUpParams>(companyInfoInitialState);

  const handleRegister = () => {
    const res = validateInput(values, inputsValidation);
    if (Object.keys(res).length > 0 || repeatPassword.value !== values.password) {
      setRepeatPassword({ ...repeatPassword, error: true });
      setErrors(res);
    } else {
      dispatch(signUp({
        ...values,
        ...(selectedType === 2 && { ...companyInfo }),
      }));
    }
  };

  useEffect(() => {
    if (errors) {
      setErrors(validateInput(values, inputsValidation));
    }
  }, [errors]);

  return (
    <>
      <div className="popup--heading">
        <h2>რეგისტრაცია</h2>
        <p>
          უკვე ხარ რეგისტრირებული? გაიარე
          <Link to="/" className="link popup--link">ავტორიზაცია</Link>
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
      <form className="popup--form">
        { step === 1 ? (
          <>
            <TextField
              error={errors?.firstName}
              label="სახელი"
              inputName="firstName"
              value={values.firstName}
              handleChange={(firstName) => {
                setValues({ ...values, firstName });
              }}
            />
            <TextField
              error={errors?.lastName}
              label="გვარი"
              inputName="lastName"
              value={values.lastName}
              handleChange={(lastName) => {
                setValues({ ...values, lastName });
              }}
            />
            <TextField
              error={errors?.email}
              label="ელ.ფოსტა"
              inputName="email"
              value={values.email}
              handleChange={(email) => {
                setValues({ ...values, email });
              }}
            />
            <TextField
              error={errors?.phone}
              label="მობილურის ნომერი"
              inputName="phone"
              value={values.phone}
              handleChange={(phone) => {
                setValues({ ...values, phone });
              }}
            />
            <TextField
              error={errors?.password}
              type="password"
              label="პაროლი"
              inputName="password"
              value={values.password}
              handleChange={(password) => {
                setValues({ ...values, password });
                password.length === 0 && repeatPassword.error && setRepeatPassword({ ...repeatPassword, error: false });
              }}
            />
            <TextField
              type="password"
              label="გაიმეორე პაროლი"
              inputName="repeatPassword"
              value={repeatPassword.value}
              handleChange={(pass) => setRepeatPassword({ value: pass, error: pass !== values.password })}
              error={((values.password && repeatPassword.value && values.password !== repeatPassword.value)
                || repeatPassword.error) && 'პაროლი არასწორია'}
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
        <Checkbox checked={acceptTerm} handleChange={(val) => setAcceptTerm(val)} />
      </form>
      <div className="popup--form-controls">
        <Button
          handleClick={() => (selectedType === 2 && step === 1 ? setStep(2) : handleRegister())}
          type="primary"
        >
          {selectedType === 2 && step === 1 ? 'შემდეგი' : 'რეგისტრაცია'}
        </Button>
      </div>
    </>
  );
};

export default SignUp;

const companyInfoInitialState: CompanySignUpParams = {
  companyName: '',
  identificationCode: '',
  city: '',
  address: '',
};

const inputsValidation = {
  firstName: { name: 'სახელი', min: 3, required: true },
  lastName: { name: 'გვარი', min: 3, required: true },
  email: { name: 'ელ.ფოსტა', pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, required: true },
  password: { name: 'პაროლი', min: 6, required: true },
  phone: {
    name: 'მობილურის ნომერი', min: 9, required: true, errorMessage: 'მობილურის ნომერი არასწორია ',
  },
};
