import { useEffect, useState } from 'react';
import { AsyncStorage } from '../../../shared';

type AuthInitialRoute = 'login' | 'mainTabs';
type AuthInitialTab = 'blogs' | undefined;

export function useAuthFlow() {
  const [hasAccessToken, setHasAccessToken] = useState(false);
  const [isBootstrapping, setIsBootstrapping] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const bootstrapAuth = async () => {
      try {
        const accessToken = await AsyncStorage.get<string>('accessToken');

        if (isMounted) {
          setHasAccessToken(Boolean(accessToken));
        }
      } finally {
        if (isMounted) {
          setIsBootstrapping(false);
        }
      }
    };

    void bootstrapAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  const initialRouteName: AuthInitialRoute =
    hasAccessToken ? 'mainTabs' : 'login';
  const initialMainTabScreen: AuthInitialTab = hasAccessToken
    ? 'blogs'
    : undefined;

  return {
    initialRouteName,
    initialMainTabScreen,
    isBootstrapping,
  };
}
