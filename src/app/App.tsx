import { AppProviders } from './providers/AppProviders.tsx';
import { AppNavigation } from './navigation/AppNavigation.tsx';

export function App() {
  return (
    <AppProviders>
      <AppNavigation />
    </AppProviders>
  );
}
