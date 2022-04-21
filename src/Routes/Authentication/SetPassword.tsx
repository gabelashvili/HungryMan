import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../../components/shared/Button';
import TextField from '../../components/shared/TextField';
import { setPassword } from '../../store/ducks/authDuck';

const SetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [password, setNewPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const token = searchParams.get('token');

  const handleClick = () => {
    if (token) {
      setLoading(true);
      dispatch(setPassword(password, token, {
        success: () => {
          navigate('/');
        },
        error: () => setLoading(false),
      }));
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [token]);
  return (
    <>
      <div className="popup--heading">
        <h2>პაროლის აღდგენა</h2>
        <p>
          შეიყვანეთ ახალი პაროლი
        </p>
      </div>
      <form className="popup--form">
        <div className="form__group">
          <TextField
            error={password && password.length < 6}
            label="ახალი პაროლი"
            value={password}
            inputName="password"
            handleChange={(password) => setNewPassword(password)}
          />
        </div>
      </form>
      <div className="popup--form-controls">
        <Button disabled={password.length < 6} handleClick={handleClick} loading={loading} type="primary">შეცვლა</Button>
      </div>
    </>
  );
};

export default SetPassword;
