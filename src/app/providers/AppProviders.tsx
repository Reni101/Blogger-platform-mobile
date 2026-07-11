import { QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { initNetworkStatusListener, ThemeProvider } from '../../shared';
import { queryClient } from './query-client';
import { InitProvider } from './InitProvider.tsx';

export function AppProviders({ children }: PropsWithChildren) {
  useEffect(() => {
    return initNetworkStatusListener();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <ThemeProvider>
          <InitProvider>{children}</InitProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
