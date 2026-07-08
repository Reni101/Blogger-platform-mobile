import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import { AuthApi } from '../api/auth-api.ts';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../app/navigation/AppNavigation.tsx';
import { AsyncStorage, SecureStorage } from '../../../shared';
import { meQueryKey } from './useMeQuery.ts';

type LogoutResponse = Awaited<ReturnType<typeof AuthApi.logOut>> | null;
type LoginNavigation = NativeStackNavigationProp<RootStackParamList, 'login'>;

export function useLogoutMutation(
  options?: UseMutationOptions<LogoutResponse, Error, void>,
) {
  const navigation = useNavigation<LoginNavigation>();
  const { onSuccess, onError, ...mutationOptions } = options ?? {};

  return useMutation<LogoutResponse, Error, void>({
    mutationFn: async () => {
      const refreshToken = await SecureStorage.get<string>('refreshToken');

      if (!refreshToken) {
        await AsyncStorage.remove('accessToken');
        await SecureStorage.remove('refreshToken');
        navigation.replace('login');
        return null;
      }

      return AuthApi.logOut(refreshToken);
    },
    onSuccess: async (data, variables, onMutateResult, context) => {
      if (data) {
        await SecureStorage.remove('refreshToken');
        await AsyncStorage.remove('accessToken');
      }
      navigation.replace('login');
      context.client.removeQueries({ queryKey: meQueryKey });
      await onSuccess?.(data, variables, onMutateResult, context);
    },
    ...mutationOptions,
    onError: async (data, variables, onMutateResult, context) => {
      await SecureStorage.remove('refreshToken');
      await AsyncStorage.remove('accessToken');
      await onError?.(data, variables, onMutateResult, context);
    },
  });
}
