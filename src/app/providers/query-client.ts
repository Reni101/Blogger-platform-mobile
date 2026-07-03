import {
  MutationCache,
  QueryCache,
  QueryClient,
} from '@tanstack/react-query';
import { handleGlobalQueryError } from './query-error-handler.ts';

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: handleGlobalQueryError,
  }),
  mutationCache: new MutationCache({
    onError: handleGlobalQueryError,
  }),
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      gcTime: 5 * 60_000,
      retry: 1,
    },
  },
});
