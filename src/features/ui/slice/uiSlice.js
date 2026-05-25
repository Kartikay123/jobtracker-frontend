import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: typeof window !== 'undefined' ? localStorage.getItem('theme') || 'light' : 'light',
  sidebarOpen: true,
  globalLoading: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (s) => {
      s.theme = s.theme === 'light' ? 'dark' : 'light';
      try {
        localStorage.setItem('theme', s.theme);
      } catch {
        /* ignore */
      }
    },
    setTheme: (s, a) => {
      s.theme = a.payload;
      try {
        localStorage.setItem('theme', s.theme);
      } catch {
        /* ignore */
      }
    },
    toggleSidebar: (s) => {
      s.sidebarOpen = !s.sidebarOpen;
    },
    setGlobalLoading: (s, a) => {
      s.globalLoading = a.payload;
    },
  },
});

export const { toggleTheme, setTheme, toggleSidebar, setGlobalLoading } = uiSlice.actions;
export const selectTheme = (s) => s.ui.theme;
export const selectSidebarOpen = (s) => s.ui.sidebarOpen;
export default uiSlice.reducer;
