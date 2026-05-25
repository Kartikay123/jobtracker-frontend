import { api } from '@/lib/axios';

export const analyticsApi = {
  summary: (range) =>
    api.get('/analytics/summary', { params: { range } }).then((r) => r.data),
};
