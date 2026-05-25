import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '@/features/auth/slice/authSlice';

export const PublicRoute = () => {
  const isAuth = useSelector(selectIsAuthenticated);
  return isAuth ? <Navigate to="/dashboard" replace /> : <Outlet />;
};
