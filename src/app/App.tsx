import { StatusBar, useColorScheme } from 'react-native';
import { AppProviders } from './providers/AppProviders.tsx';
import { AppNavigation } from './navigation/AppNavigation.tsx';

export function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <AppProviders>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppNavigation />
    </AppProviders>
  );
}
