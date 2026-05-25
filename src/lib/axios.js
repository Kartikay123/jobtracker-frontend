import axios from 'axios';
import { env } from '@/config/env';
import { store } from '@/app/store';
import { logout } from '@/features/auth/slice/authSlice';

export const api = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (r) => r,
  (error) => {
    const status = error.response?.status;
    if (status === 401) store.dispatch(logout());
    if (env.isDev) {
      // eslint-disable-next-line no-console
      console.error('[api]', status, error.config?.url, error.response?.data);
    }
    return Promise.reject(error);
  },
);
