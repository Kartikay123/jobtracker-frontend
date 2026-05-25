import { api } from '@/lib/axios';

export const jobsApi = {
  list: (filters) => api.get('/jobs', { params: filters }).then((r) => r.data),
  get: (id) => api.get(`/jobs/${id}`).then((r) => r.data),
  create: (payload) => api.post('/jobs', payload).then((r) => r.data),
  update: (id, payload) => api.patch(`/jobs/${id}`, payload).then((r) => r.data),
  updateStatus: (id, status) =>
    api.patch(`/jobs/${id}/status`, { status }).then((r) => r.data),
  remove: (id) => api.delete(`/jobs/${id}`).then((r) => r.data),
};
