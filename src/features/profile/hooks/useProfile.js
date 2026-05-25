import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { profileApi } from '../api/profileApi';

const PROFILE_KEY = ['profile'];

export const useProfile = () =>
  useQuery({ queryKey: PROFILE_KEY, queryFn: profileApi.get });

export const useUploadResume = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: profileApi.uploadResume,
    onSuccess: () => { qc.invalidateQueries({ queryKey: PROFILE_KEY }); toast.success('Resume saved to profile'); },
    onError: () => toast.error('Failed to upload resume'),
  });
};

export const useDeleteResume = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: profileApi.deleteResume,
    onSuccess: () => { qc.invalidateQueries({ queryKey: PROFILE_KEY }); toast.success('Resume removed'); },
  });
};
