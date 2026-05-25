import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { jobsApi } from '../api/jobsApi';
import { queryKeys } from '@/app/queryClient';
import { selectJobFilters } from '../slice/jobsSlice';

export const useJobs = () => {
  const filters = useSelector(selectJobFilters);
  return useQuery({
    queryKey: queryKeys.jobs.list(filters),
    queryFn: () => jobsApi.list(filters),
  });
};

export const useCreateJob = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: jobsApi.create,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.jobs.all });
      toast.success('Job added');
    },
    onError: (e) => toast.error(e.response?.data?.message || 'Failed to add job'),
  });
};

export const useUpdateJob = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...payload }) => jobsApi.update(id, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.jobs.all }),
  });
};

export const useUpdateJobStatus = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }) => jobsApi.updateStatus(id, status),
    onMutate: async ({ id, status }) => {
      await qc.cancelQueries({ queryKey: queryKeys.jobs.all });
      const snapshots = qc.getQueriesData({ queryKey: queryKeys.jobs.all });
      qc.setQueriesData({ queryKey: queryKeys.jobs.all }, (old) => {
        if (!Array.isArray(old)) return old;
        return old.map((j) => (j.id === id ? { ...j, status } : j));
      });
      return { snapshots };
    },
    onError: (_e, _v, ctx) => {
      ctx?.snapshots?.forEach(([key, data]) => qc.setQueryData(key, data));
      toast.error('Failed to update status');
    },
    onSettled: () => qc.invalidateQueries({ queryKey: queryKeys.jobs.all }),
  });
};

export const useDeleteJob = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: jobsApi.remove,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.jobs.all });
      toast.success('Job deleted');
    },
  });
};
