import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from '../hooks/useSelector';
import Authentication from '../Routes/Authentication/Authentication';
import RecoverPassword from '../Routes/Authentication/RecoverPassword';
import SetPassword from '../Routes/Authentication/SetPassword';
import SignIn from '../Routes/Authentication/SignIn';
import SignUp from '../Routes/Authentication/SignUp';
import ChangePassword from '../Routes/UserDashboard/ChangePassword';
import OrderHistory from '../Routes/UserDashboard/OrderHistory';
import PersonalInfo from '../Routes/UserDashboard/PersonalInfo';
import UserDashboard from '../Routes/UserDashboard/UserDashboard';
import { checkToken } from '../store/ducks/userDuck';
import Layout from './Layout';
import './styles.scss';

function App() {
  const dispatch = useDispatch();
  const authedUser = useSelector((state) => state.userReducer.user);
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
              {authedUser ? (
                <Route path="user-dashboard" element={<UserDashboard />}>
                  <Route index element={<PersonalInfo />} />
                  <Route path="change-password" element={<ChangePassword />} />
                  <Route path="order-history" element={<OrderHistory />} />
                </Route>
              ) : (
                <>
                  <Route index element={<SignIn />} />
                  <Route path="sign-up" element={<SignUp />} />
                  <Route path="recover-password" element={<RecoverPassword />} />
                  <Route path="set-password" element={<SetPassword />} />
                </>
              )}
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
