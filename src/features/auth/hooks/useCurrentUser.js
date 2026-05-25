import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../slice/authSlice';

export const useCurrentUser = () => useSelector(selectCurrentUser);
