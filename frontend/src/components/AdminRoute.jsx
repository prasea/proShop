import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const AdminRoute = () => {
  const auth = useSelector((state) => state.auth);
  const { userInfo } = auth;

  return userInfo && userInfo.isAdmin ? <Outlet /> : <Navigate to={'/login'} replace />;
};

export default AdminRoute;
