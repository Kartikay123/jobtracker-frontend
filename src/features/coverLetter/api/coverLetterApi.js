import { api } from '@/lib/axios';

export const coverLetterApi = {
  generate: ({ jobDescription, file }) => {
    const fd = new FormData();
    fd.append('jobDescription', jobDescription);
    if (file) fd.append('resume', file);
    return api.post('/ai/cover-letter', fd, { timeout: 60_000 }).then((r) => r.data);
  },
};
