import { api } from '@/lib/axios';

export const profileApi = {
  get: () => api.get('/profile').then((r) => r.data),
  uploadResume: (file) => {
    const fd = new FormData();
    fd.append('resume', file);
    return api.post('/profile/resume', fd).then((r) => r.data);
  },
  deleteResume: () => api.delete('/profile/resume').then((r) => r.data),
};
