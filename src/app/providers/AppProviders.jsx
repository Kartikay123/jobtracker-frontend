import { Provider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { store } from '@/app/store';
import { queryClient } from '@/app/queryClient';
import { ThemeProvider } from './ThemeProvider';
import { ErrorBoundary } from '@/shared/components/ErrorBoundary/ErrorBoundary';

export const AppProviders = ({ children }) => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ErrorBoundary>
          {children}
          <Toaster position="top-right" />
        </ErrorBoundary>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </Provider>
);
