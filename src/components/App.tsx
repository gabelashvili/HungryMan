import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from '../hooks/useSelector';
import Authentication from '../Routes/Authentication/Authentication';
import SignIn from '../Routes/Authentication/SignIn/SignIn';
import SignUp from '../Routes/Authentication/SignUp/SignUp';
import { checkToken } from '../store/ducks/authDuck';
import Layout from './shared/Layout';
import './styles.scss';

function App() {
  const dispatch = useDispatch();
  const authedUser = useSelector((state) => state.authReducer.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(checkToken({ error: () => setLoading(false), success: () => setLoading(false) }));
    }
    if (!token) {
      setLoading(false);
    }
  }, []);

  return (
    <div>
      <ToastContainer autoClose={1200} limit={3} pauseOnFocusLoss={false} />
      {loading ? null : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={authedUser ? <Layout /> : <Authentication />}>
              {authedUser ? null : (
                <>
                  <Route index element={<SignIn />} />
                  <Route path="sign-up" element={<SignUp />} />
                </>
              )}
            </Route>
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
