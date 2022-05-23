/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  useLocation,
  useNavigate,
  useRoutes,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Authentication from '../Routes/Authentication/Authentication';
import RecoverPassword from '../Routes/Authentication/RecoverPassword';
import SetPassword from '../Routes/Authentication/SetPassword';
import SignIn from '../Routes/Authentication/SignIn';
import SignUp from '../Routes/Authentication/SignUp';
import Cubes from '../Routes/Cubes';
import Home from '../Routes/Home/Home';
import Cart from '../Routes/Products/Cart/Cart';
import ProductDetails from '../Routes/Products/ProductDetails/ProductDetails';
import Products from '../Routes/Products/Products';
import Test from '../Routes/Test';
import ChangePassword from '../Routes/UserDashboard/ChangePassword';
import OrderHistory from '../Routes/UserDashboard/OrderHistory';
import PersonalInfo from '../Routes/UserDashboard/PersonalInfo';
import UserDashboard from '../Routes/UserDashboard/UserDashboard';
import { checkToken } from '../store/ducks/userDuck';
import PaymentError from './Cart/PaymentError';
import PaymentSuccess from './Cart/PaymentSuccess';
import Layout from './Layout';
import RequireAuth from './shared/RequireAuth';
import './styles.scss';

function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
      element: <Layout />,
      children: [
        {
          path: 'home',
          element: <Home />,
        },
        {
          path: 'auth',
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
        {
          path: 'user-dashboard',
          element: <RequireAuth><UserDashboard /></RequireAuth>,
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
            {
              path: 'cart',
              element: <RequireAuth><Cart /></RequireAuth>,
            },
            {
              path: 'cart/success',
              element: <RequireAuth><PaymentSuccess /></RequireAuth>,
            },
            {
              path: 'cart/error',
              element: <RequireAuth><PaymentError /></RequireAuth>,
            },
          ],
        },
        {
          path: 'cubes',
          children: [
            {
              index: true,
              element: <Cubes />,
            },
          ],
        },
        {
          path: 'Test',
          element: <Test />,
        },
      ],
    },
  ];

  const routes = useRoutes(defaultRoutes);
  useEffect(() => {
    if (pathname === '/') {
      navigate('/home');
    }
  }, [pathname]);
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
