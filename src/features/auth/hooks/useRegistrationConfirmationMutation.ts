import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthApi } from '../api/auth-api.ts';
import type { ConfirmationBodyType } from '../api/authTypes.ts';
import type { RootStackParamList } from '../../../app/navigation/AppNavigation.tsx';
import type { DomainException } from '../../../shared';
import { meQueryKey } from './useMeQuery.ts';

type RegistrationConfirmationResponse = Awaited<
  ReturnType<typeof AuthApi.registrationConfirmation>
>;
type RegistrationConfirmationError = AxiosError<DomainException>;
type ConfirmationEmailNavigation = NativeStackNavigationProp<
  RootStackParamList,
  'confirmationEmail'
>;

export function useRegistrationConfirmationMutation(
  options?: UseMutationOptions<
    RegistrationConfirmationResponse,
    RegistrationConfirmationError,
    ConfirmationBodyType
  >,
) {
  const navigation = useNavigation<ConfirmationEmailNavigation>();
  const { onSuccess, ...mutationOptions } = options ?? {};

  return useMutation<
    RegistrationConfirmationResponse,
    RegistrationConfirmationError,
    ConfirmationBodyType
  >({
    mutationFn: body => AuthApi.registrationConfirmation(body),
    ...mutationOptions,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await context.client.invalidateQueries({ queryKey: meQueryKey });
      navigation.replace('mainTabs', { screen: 'profile' });
      await onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}
