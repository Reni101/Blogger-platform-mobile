import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { AuthApi } from '../api/auth-api.ts';
import type { EmailResendingBodyType } from '../api/authTypes.ts';
import type { DomainException } from '../../../shared';

type RegistrationEmailResendingResponse = Awaited<
  ReturnType<typeof AuthApi.registrationEmailResending>
>;
type RegistrationEmailResendingError = AxiosError<DomainException>;

export function useRegistrationEmailResendingMutation(
  options?: UseMutationOptions<
    RegistrationEmailResendingResponse,
    RegistrationEmailResendingError,
    EmailResendingBodyType
  >,
) {
  return useMutation<
    RegistrationEmailResendingResponse,
    RegistrationEmailResendingError,
    EmailResendingBodyType
  >({
    mutationFn: body => AuthApi.registrationEmailResending(body),
    ...options,
  });
}
