import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { selectAuth } from '@/features/auth/slice/authSlice';

// Same validity check as ProtectedRoute — keeps the two route guards
// consistent so an expired token can't bounce between /login ↔ /dashboard.
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

export const PublicRoute = () => {
  const { token } = useSelector(selectAuth);
  return isTokenValid(token) ? <Navigate to="/dashboard" replace /> : <Outlet />;
};
