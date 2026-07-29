import { AppProviders } from './providers/AppProviders.tsx';
import { AppNavigation } from './navigation/AppNavigation.tsx';
import Toast from 'react-native-toast-message';

export function App() {
  return (
    <AppProviders>
      <AppNavigation />
      <Toast />
    </AppProviders>
  );
}
