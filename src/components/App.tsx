/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  useRoutes,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from '../hooks/useSelector';
import Authentication from '../Routes/Authentication/Authentication';
import RecoverPassword from '../Routes/Authentication/RecoverPassword';
import SetPassword from '../Routes/Authentication/SetPassword';
import SignIn from '../Routes/Authentication/SignIn';
import SignUp from '../Routes/Authentication/SignUp';
import ProductDetails from '../Routes/Products/ProductDetails';
import Products from '../Routes/Products/Products';
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

  const defaultRoutes = [
    {
      path: '/',
      element: <Authentication />,
      children: [
        {
          index: true,
          element: <SignIn />,
        },
        {
          path: 'sign-up',
          element: <SignUp />,
        },
        {
          path: 'recover-password',
          element: <RecoverPassword />,
        },
        {
          path: 'set-password',
          element: <SetPassword />,
        },
      ],
    },
  ];

  const authedUserRoutes = [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: 'user-dashboard',
          element: <UserDashboard />,
          children: [
            {
              index: true,
              element: <PersonalInfo />,
            },
            {
              path: 'change-password',
              element: <ChangePassword />,
            },
            {
              path: 'order-history',
              element: <OrderHistory />,
            },
          ],
        },
        {
          path: 'products',
          children: [
            {
              index: true,
              element: <Products />,
            },
            {
              path: ':productId',
              element: <ProductDetails />,
            },
          ],
        },
      ],
    },
  ];

  const routes = useRoutes(authedUser ? authedUserRoutes : defaultRoutes);
  return (
    <div>
      <ToastContainer autoClose={1200} limit={3} pauseOnFocusLoss={false} />
      {loading ? null : (
        routes
      )}
    </div>
  );
}

export default App;
