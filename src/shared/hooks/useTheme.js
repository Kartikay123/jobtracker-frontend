import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '@/features/ui/slice/uiSlice';

export const useTheme = () => {
  const theme = useSelector((s) => s.ui.theme);
  const dispatch = useDispatch();
  return { theme, toggle: () => dispatch(toggleTheme()) };
};
