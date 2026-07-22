import { lazy, memo, Suspense } from 'react';
import { ScreenFallback } from '../../../shared';

const ProfileScreen = lazy(() => import('./ProfileScreen.tsx'));

export const ProfileScreenAsync = memo(() => (
  <Suspense fallback={<ScreenFallback />}>
    <ProfileScreen />
  </Suspense>
));
