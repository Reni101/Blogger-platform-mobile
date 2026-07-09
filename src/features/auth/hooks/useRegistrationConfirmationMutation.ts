import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthApi } from '../api/auth-api.ts';
import type { ConfirmationBodyType } from '../api/auth-types.ts';
import type { ProfileStackParamList } from '../../../app/navigation/ProfileStackNavigator.tsx';
import type { DomainException } from '../../../shared';
import { meQueryKey } from '../../../entities/user';

type RegistrationConfirmationResponse = Awaited<
  ReturnType<typeof AuthApi.registrationConfirmation>
>;
type RegistrationConfirmationError = AxiosError<DomainException>;
type ConfirmationEmailNavigation = NativeStackNavigationProp<
  ProfileStackParamList,
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
      navigation.replace('profileHome');
      await onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}
