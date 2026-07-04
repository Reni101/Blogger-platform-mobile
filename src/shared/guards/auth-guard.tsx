import { useCallback, useEffect, useState, type PropsWithChildren } from 'react';
import { ActivityIndicator, Alert, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../app/navigation/AppNavigation.tsx';
import { AsyncStorage, onAuthSessionExpired } from '../lib';

type AuthGuardNavigation = NativeStackNavigationProp<
  RootStackParamList,
  'mainTabs'
>;

type AuthStatus = 'checking' | 'authenticated' | 'unauthenticated';

const loaderStyle = {
  alignItems: 'center' as const,
  flex: 1,
  justifyContent: 'center' as const,
};

export function AuthGuard({ children }: PropsWithChildren) {
  const navigation = useNavigation<AuthGuardNavigation>();
  const [status, setStatus] = useState<AuthStatus>('checking');

  const redirectToLogin = useCallback(() => {
    setStatus('unauthenticated');
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

      if (accessToken) {
        setStatus('authenticated');
      } else {
        redirectToLogin();
      }
    })();

    const unsubscribe = onAuthSessionExpired(redirectToLogin);

    return () => {
      isActive = false;
      unsubscribe();
    };
  }, [redirectToLogin]);

  if (status === 'checking') {
    return (
      <View style={loaderStyle}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (status === 'unauthenticated') {
    return null;
  }

  return children;
}
