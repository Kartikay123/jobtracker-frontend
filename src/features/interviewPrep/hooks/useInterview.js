import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { interviewApi } from '../api/interviewApi';
import { queryKeys } from '@/app/queryClient';

export const useGenerateQuestions = () =>
  useMutation({
    mutationFn: interviewApi.generate,
    onError: (e) => {
      if (e.response?.status === 429) {
        toast.error('Rate limit hit — try again in a minute.');
      } else {
        toast.error(e.response?.data?.message || 'Failed to generate questions');
      }
    },
  });

export const useSaveAnswer = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: interviewApi.saveAnswer,
    onSuccess: () => {
      toast.success('Answer saved');
      qc.invalidateQueries({ queryKey: queryKeys.interview.sessions });
    },
  });
};

export const useInterviewSessions = () =>
  useQuery({
    queryKey: queryKeys.interview.sessions,
    queryFn: interviewApi.sessions,
  });
