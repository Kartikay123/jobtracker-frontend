import { api } from '@/lib/axios';

export const authApi = {
  login: (creds) => api.post('/auth/login', creds).then((r) => r.data),
  signup: (data) => api.post('/auth/signup', data).then((r) => r.data),
  me: () => api.get('/auth/me').then((r) => r.data),
};
