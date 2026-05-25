import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { resumeApi } from '../api/resumeApi';

export const useMatchResume = () =>
  useMutation({
    mutationFn: resumeApi.match,
    onError: (e) => {
      if (e.response?.status === 429) {
        toast.error('Rate limit hit — try again in a minute.');
      } else {
        toast.error(e.response?.data?.message || 'Match failed');
      }
    },
  });
