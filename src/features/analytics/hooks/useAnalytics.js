import { useQuery } from '@tanstack/react-query';
import { analyticsApi } from '../api/analyticsApi';
import { queryKeys } from '@/app/queryClient';

export const useAnalytics = (range = '30d') =>
  useQuery({
    queryKey: queryKeys.analytics.summary(range),
    queryFn: () => analyticsApi.summary(range),
    staleTime: 5 * 60_000,
  });
