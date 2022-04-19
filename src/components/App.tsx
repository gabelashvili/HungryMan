import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Authentication from '../Routes/Authentication/Authentication';
import SignIn from '../Routes/Authentication/SignIn/SignIn';
import SignUp from '../Routes/Authentication/SignUp/SignUp';
import './styles.scss';

function App() {
  return (
    <div>
      <ToastContainer autoClose={1200} limit={3} pauseOnFocusLoss={false} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Authentication />}>
            <Route index element={<SignIn />} />
            <Route path="sign-up" element={<SignUp />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
