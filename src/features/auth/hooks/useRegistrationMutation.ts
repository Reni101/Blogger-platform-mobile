import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { AuthApi } from '../api/auth-api.ts';
import type { RegistrationBodyType } from '../api/auth-types.ts';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../app/navigation/AppNavigation.tsx';
import type { DomainException } from '../../../shared';

type RegistrationResponse = Awaited<ReturnType<typeof AuthApi.registration>>;
type RegistrationError = AxiosError<DomainException>;
type RegistrationNavigation = NativeStackNavigationProp<
  RootStackParamList,
  'register'
>;

export function useRegistrationMutation(
  options?: UseMutationOptions<
    RegistrationResponse,
    RegistrationError,
    RegistrationBodyType
  >,
) {
  const navigation = useNavigation<RegistrationNavigation>();

  return useMutation<
    RegistrationResponse,
    RegistrationError,
    RegistrationBodyType
  >({
    mutationFn: body => AuthApi.registration(body),
    onSuccess: () => {
      navigation.replace('login');
    },
    ...options,
  });
}
