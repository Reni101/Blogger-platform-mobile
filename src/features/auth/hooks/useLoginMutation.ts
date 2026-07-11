import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { AuthApi } from '../api/auth-api.ts';
import type { LoginBodyType } from '../api/auth-types.ts';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../app/navigation/AppNavigation.tsx';
import type { DomainException } from '../../../shared';
import { useAuthStore } from '../model/store/auth-store.ts';

type LoginResponse = Awaited<ReturnType<typeof AuthApi.login>>;
type LoginError = AxiosError<DomainException>;
type LoginNavigation = NativeStackNavigationProp<RootStackParamList, 'login'>;

export function useLoginMutation(
  options?: UseMutationOptions<LoginResponse, LoginError, LoginBodyType>,
) {
  const login = useAuthStore(s => s.login);
  const navigation = useNavigation<LoginNavigation>();
  return useMutation<LoginResponse, LoginError, LoginBodyType>({
    mutationFn: body => AuthApi.login(body),

    onSuccess: async data => {
      const { refreshToken, accessToken } = data.data;

      await login(accessToken, refreshToken);
      navigation.replace('mainTabs');
    },
    ...options,
  });
}
