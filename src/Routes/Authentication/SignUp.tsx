/* eslint-disable react/no-unescaped-entities */
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/shared/Button';
import Checkbox from '../../components/shared/Checkbox';
import TextField from '../../components/shared/TextField';
import validateInput from '../../helpers/inputsValidations';
import { signUp } from '../../store/ducks/userDuck';
import { CompanySignUpParams, UserSignUpParams } from '../../types/user';
import Rules from './Rules';

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openRules, setOpenRules] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<null | {[key:string]: string}>(null);
  const [selectedType, setSelectedType] = useState<1 | 2>(1);
  const [step, setStep] = useState<1 | 2>(1);
  const [repeatPassword, setRepeatPassword] = useState<string>('');
  const [acceptTerm, setAcceptTerm] = useState<boolean>(false);
  const [values, setValues] = useState<UserSignUpParams>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
  });
  const [companyInfo, setCompanyInfo] = useState<CompanySignUpParams>(companyInfoInitialState);

  const inputs = () => {
    if (selectedType === 1) {
      return { ...values, term: acceptTerm, repeatPassword };
    }
    if (selectedType === 2 && step === 1) {
      return {
        ...values, repeatPassword, ...companyInfo,
      };
    }
    return {
      ...values, term: acceptTerm, repeatPassword, ...companyInfo,
    };
  };

  const validations = () => {
    if (selectedType === 1) {
      return { ...inputsValidation, ...termValidation };
    }
    if (selectedType === 2 && step === 1) {
      return { ...inputsValidation };
    }
    return { ...inputsValidation, ...companyInfoValidation, ...termValidation };
  };

  const handleRegister = () => {
    const res = validateInput(inputs(), validations());
    if (Object.keys(res).length > 0) {
      setErrors(res);
    } else {
      setLoading(true);
      dispatch(signUp({
        ...values,
        ...(selectedType === 2 && { ...companyInfo }),
      }, {
        success: () => {
          setLoading(false);
          navigate('/auth');
        },
        error: () => setLoading(false),
      }));
    }
  };

  const handleStepChange = () => {
    const res = validateInput(inputs(), validations());
    if (Object.keys(res).length > 0) {
      setErrors(res);
    } else {
      setStep(2);
    }
  };

  useEffect(() => {
    if (errors) {
      setErrors(validateInput(inputs(), validations()));
    }
  }, [values, companyInfo, selectedType, acceptTerm, repeatPassword]);

  return (
    <>
      <Rules open={openRules} toggle={() => setOpenRules(!openRules)} />
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
            setErrors(null);
          }}
        >
          <span> ფიზიკური პირი </span>
        </div>
        <div
          className={clsx('register-tab--item', selectedType === 2 && 'is-active')}
          onClick={() => {
            setSelectedType(2);
            setErrors(null);
          }}
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
              }}
            />
            <TextField
              type="password"
              label="გაიმეორე პაროლი"
              inputName="repeatPassword"
              value={repeatPassword}
              handleChange={(pass) => setRepeatPassword(pass)}
              error={errors?.repeatPassword}
            />
          </>
        ) : (
          <>
            <TextField
              label="კომპანიის სახელი"
              inputName="companyName"
              value={companyInfo.companyName}
              error={errors?.companyName}
              handleChange={(companyName) => setCompanyInfo({ ...companyInfo, companyName })}
            />
            <TextField
              label="საიდენტიფიკაციო კოდი"
              inputName="identificationCode"
              value={companyInfo.identificationCode}
              error={errors?.identificationCode}
              handleChange={(identificationCode) => setCompanyInfo({ ...companyInfo, identificationCode })}
            />
            <TextField
              label="ქალაქი"
              inputName="city"
              value={companyInfo.city}
              error={errors?.city}
              handleChange={(city) => setCompanyInfo({ ...companyInfo, city })}
            />
            <TextField
              label="მისამართი"
              inputName="address"
              error={errors?.address}
              value={companyInfo.address}
              handleChange={(address) => setCompanyInfo({ ...companyInfo, address })}
            />
          </>
        )}
        {(selectedType === 1 || (selectedType === 2 && step === 2)) && (
        <Checkbox
          error={!!errors?.term}
          checked={acceptTerm}
          handleClick={() => setOpenRules(true)}
          handleChange={(val) => {
            setAcceptTerm(val);
          }}
        />
        )}
      </form>
      <div className="popup--form-controls">
        <Button
          handleClick={() => (selectedType === 2 && step === 1 ? handleStepChange() : handleRegister())}
          type="primary"
          loading={loading}
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
  repeatPassword: { name: 'გაიმეორე პაროლი' },
};

const termValidation = {
  term: { name: 'წესები და პირობები', required: true },
};

const companyInfoValidation = {
  companyName: { name: 'კომპანიის სახელი', min: 3, required: true },
  identificationCode: { name: 'საიდენტიფიკაციო კოდი', min: 3, required: true },
  city: { name: 'ქალაქი', min: 3, required: true },
  address: { name: 'მისამართი', min: 3, required: true },
};
