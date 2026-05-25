import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import { loadAuthState, saveAuthState } from '@/lib/storage';

const persisted = loadAuthState();
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
