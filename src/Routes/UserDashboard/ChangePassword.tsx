import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../../components/shared/Button';
import TextField from '../../components/shared/TextField';
import { updateUserPassword } from '../../store/ducks/userDuck';

const ChangePassword = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
      oldPassword?: boolean,
      password?: boolean,
      repeatPassword?: boolean,
  } | null>(null);

  const [values, setValues] = useState<{
    oldPassword: string,
    password: string,
    repeatPassword: string,
  }>({
    oldPassword: '',
    password: '',
    repeatPassword: '',
  });

  const checkError = () => {
    let res = false;
    const errorField = {
      oldPassword: false,
      password: false,
      repeatPassword: false,
    };
    if (values.oldPassword.length < 6) {
      res = true;
      errorField.oldPassword = true;
    }
    if (values.password.length < 6) {
      res = true;
      errorField.password = true;
    }
    if (values.repeatPassword.length < 6) {
      res = true;
      errorField.repeatPassword = true;
    }
    if (values.password && values.repeatPassword && values.password !== values.repeatPassword) {
      res = true;
      errorField.repeatPassword = true;
    }
    return {
      isError: res,
      errorField,
    };
  };

  const handleSave = () => {
    const { isError, errorField } = checkError();
    if (isError) {
      setErrors(errorField);
    } else {
      setLoading(true);
      dispatch(updateUserPassword(
        { password: values.password, oldPassword: values.oldPassword },
        {
          success: () => {
            setLoading(false);
            setErrors(null);
            setValues({
              oldPassword: '',
              password: '',
              repeatPassword: '',
            });
          },
          error: (statusCode: number) => {
            setLoading(false);
            statusCode === 500 && setErrors({ oldPassword: true });
          },
        },
      ));
    }
  };

  useEffect(() => {
    if (errors) {
      const { errorField } = checkError();
      setErrors(errorField);
    }
  }, [values]);

  return (
    <>
      <div className="panel--header with-border">
        <h3 className="panel--title">პაროლის შეცვლა</h3>
      </div>
      <div className="panel--content">
        <form className="user-dashboard--form">
          <TextField
            inputName="oldPassword"
            label="ძველი პაროლი"
            value={values.oldPassword}
            handleChange={(oldPassword) => setValues({ ...values, oldPassword })}
            error={errors?.oldPassword}
            type="password"
          />
          <TextField
            inputName="password"
            label="პაროლი"
            value={values.password}
            handleChange={(password) => setValues({ ...values, password })}
            error={errors?.password}
            type="password"
          />
          <TextField
            inputName="repeatPassword"
            label="გაიმეორე პაროლი"
            value={values.repeatPassword}
            error={errors?.repeatPassword}
            handleChange={(repeatPassword) => setValues({ ...values, repeatPassword })}
            type="password"
          />
        </form>
      </div>
      <div className="panel--footer">
        <Button
          disabled={errors?.oldPassword || errors?.password || errors?.repeatPassword}
          type="secondary"
          classes="ml-auto"
          handleClick={handleSave}
          loading={loading}
        >
          დამახსოვრება
        </Button>
      </div>
    </>
  );
};

export default ChangePassword;
