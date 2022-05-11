import { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../hooks/useSelector';

const RequireAuth = ({ children }: { children: ReactElement }) => {
  const auth = useSelector((state) => state.userReducer.user);
  const location = useLocation();

  if (!auth) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
