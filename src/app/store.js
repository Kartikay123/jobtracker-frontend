import { configureStore } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import { rootReducer } from './rootReducer';
import { loadAuthState, saveAuthState, clearAuthState } from '@/lib/storage';

// Drop any persisted auth where the JWT has already expired — otherwise
// the route guards see an expired token and bounce between /login and
// /dashboard, causing a navigation throttle / blank page.
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

let persisted = loadAuthState();
if (persisted && !isTokenValid(persisted.token)) {
  clearAuthState();
  persisted = null;
}
const preloadedState = persisted ? { auth: { ...persisted, status: 'idle', error: null } } : undefined;

export const store = configureStore({
  reducer: rootReducer,
  preloadedState,
  devTools: import.meta.env.DEV,
});

let prevAuth = store.getState().auth;
store.subscribe(() => {
  const { auth } = store.getState();
  if (auth !== prevAuth) {
    saveAuthState(auth);
    prevAuth = auth;
  }
});
