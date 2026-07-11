import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { AuthApi } from '../api/auth-api.ts';
import type { LoginBodyType } from '../api/auth-types.ts';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../app/navigation/AppNavigation.tsx';
import type { DomainException } from '../../../shared';
import { SecureStorage } from '../../../shared';

type LoginResponse = Awaited<ReturnType<typeof AuthApi.login>>;
type LoginError = AxiosError<DomainException>;
type LoginNavigation = NativeStackNavigationProp<RootStackParamList, 'login'>;

export function useLoginMutation(
  options?: UseMutationOptions<LoginResponse, LoginError, LoginBodyType>,
) {
  const navigation = useNavigation<LoginNavigation>();
  return useMutation<LoginResponse, LoginError, LoginBodyType>({
    mutationFn: body => AuthApi.login(body),

    onSuccess: async data => {
      await SecureStorage.set('refreshToken', data.data.refreshToken);
      await SecureStorage.set('accessToken', data.data.accessToken);
      navigation.replace('mainTabs');
    },
    ...options,
  });
}
