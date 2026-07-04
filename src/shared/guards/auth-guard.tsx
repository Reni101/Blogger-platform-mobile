import {
  useCallback,
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react';
import { ActivityIndicator, Alert, View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../app/navigation/AppNavigation.tsx';
import { AsyncStorage, onAuthSessionExpired } from '../lib';

type AuthGuardNavigation = NativeStackNavigationProp<
  RootStackParamList,
  'mainTabs'
>;

export function AuthGuard({ children }: PropsWithChildren) {
  const navigation = useNavigation<AuthGuardNavigation>();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const redirectToLogin = useCallback(() => {
    setIsAuthenticated(false);
    setIsChecking(false);
    navigation.replace('login');
    Alert.alert(
      'Session expired',
      'Your session has ended. Please sign in again.',
    );
  }, [navigation]);

  const verifyAccessToken = useCallback(async () => {
    const accessToken = await AsyncStorage.get<string>('accessToken');

    if (!accessToken) {
      redirectToLogin();
      return;
    }

    setIsAuthenticated(true);
    setIsChecking(false);
  }, [redirectToLogin]);

  useEffect(() => {
    void verifyAccessToken();
  }, [verifyAccessToken]);

  useEffect(() => {
    return onAuthSessionExpired(() => {
      redirectToLogin();
    });
  }, [redirectToLogin]);

  useFocusEffect(
    useCallback(() => {
      void verifyAccessToken();
    }, [verifyAccessToken]),
  );

  if (isChecking) {
    return (
      <View
        style={{
          alignItems: 'center',
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return children;
}
