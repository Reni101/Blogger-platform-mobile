import { QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { initNetworkStatusListener, ThemeProvider } from '../../shared';
import { queryClient } from './query-client';
import { UseInit } from '../store/useInit.tsx';

export function AppProviders({ children }: PropsWithChildren) {
  UseInit();
  useEffect(() => {
    return initNetworkStatusListener();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
