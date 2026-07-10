import { memo, type PropsWithChildren, useCallback, useEffect } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../app/navigation/AppNavigation.tsx';
import { AsyncStorage, onAuthSessionExpired } from '../lib';

type AuthGuardNavigation = NativeStackNavigationProp<
  RootStackParamList,
  'mainTabs'
>;

export const AuthGuard = memo(({ children }: PropsWithChildren) => {
  const navigation = useNavigation<AuthGuardNavigation>();
  // const [status, setStatus] = useState<AuthStatus>('checking');

  const redirectToLogin = useCallback(() => {
    navigation.replace('login');
    Alert.alert(
      'Session expired',
      'Your session has ended. Please sign in again.',
    );
  }, [navigation]);

  useEffect(() => {
    let isActive = true;

    void (async () => {
      const accessToken = await AsyncStorage.get<string>('accessToken');

      if (!isActive) {
        return;
      }

      if (!accessToken) {
        redirectToLogin();
      }
    })();

    const unsubscribe = onAuthSessionExpired(redirectToLogin);

    return () => {
      isActive = false;
      unsubscribe();
    };
  }, [redirectToLogin]);

  return children;
});
