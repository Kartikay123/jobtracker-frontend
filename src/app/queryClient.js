import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      gcTime: 5 * 60_000,
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        if (error?.response?.status === 401) return false;
        return failureCount < 2;
      },
    },
    mutations: { retry: 0 },
  },
});

export const queryKeys = {
  jobs: {
    all: ['jobs'],
    list: (filters) => ['jobs', 'list', filters],
    detail: (id) => ['jobs', 'detail', id],
  },
  analytics: {
    summary: (range) => ['analytics', 'summary', range],
  },
  interview: {
    sessions: ['interview', 'sessions'],
  },
  auth: {
    me: ['auth', 'me'],
  },
};
