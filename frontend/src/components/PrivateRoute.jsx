import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const PrivateRoute = () => {
  const auth = useSelector((state) => state.auth);
  const { userInfo } = auth;

  return userInfo ? <Outlet /> : <Navigate to={'/login'} replace />;
};

export default PrivateRoute;
