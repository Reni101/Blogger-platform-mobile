import { memo } from 'react';
import { StatusBar } from 'react-native';
import { AppProviders } from './providers/AppProviders.tsx';
import { AppNavigation } from './navigation/AppNavigation.tsx';
import { useAppTheme } from '../shared';

const AppContent = memo(() => {
  const { mode } = useAppTheme();

  return (
    <>
      <StatusBar barStyle={mode === 'dark' ? 'light-content' : 'dark-content'} />
      <AppNavigation />
    </>
  );
});

export function App() {
  return (
    <AppProviders>
      <AppContent />
    </AppProviders>
  );
}
