import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { selectAuth } from '@/features/auth/slice/authSlice';

const isTokenValid = (token) => {
  if (!token) return false;
  try {
    const { exp } = jwtDecode(token);
    if (!exp) return true;
    return exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

export const ProtectedRoute = () => {
  const { token } = useSelector(selectAuth);
  const location = useLocation();
  return isTokenValid(token) ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};
