import { api } from '@/lib/axios';

export const interviewApi = {
  generate: (payload) =>
    api.post('/ai/interview/questions', payload, { timeout: 60_000 }).then((r) => r.data),
  saveAnswer: (payload) =>
    api.post('/interview/answers', payload).then((r) => r.data),
  sessions: () => api.get('/interview/sessions').then((r) => r.data),
};
