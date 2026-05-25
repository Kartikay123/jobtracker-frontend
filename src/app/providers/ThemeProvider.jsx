import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export const ThemeProvider = ({ children }) => {
  const theme = useSelector((s) => s.ui.theme);
  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
  }, [theme]);
  return children;
};
