import { StatusBar, Text, useColorScheme } from 'react-native';
import { AppProviders } from '../providers/AppProviders.tsx';

export function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <AppProviders>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Text>Content</Text>
    </AppProviders>
  );
}
