import { api } from '@/lib/axios';

export const resumeApi = {
  match: ({ resumeFile, jobDescription }) => {
    const fd = new FormData();
    fd.append('resume', resumeFile);
    fd.append('jobDescription', jobDescription);
    return api
      .post('/ai/resume-match', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 60_000,
      })
      .then((r) => r.data);
  },
};
