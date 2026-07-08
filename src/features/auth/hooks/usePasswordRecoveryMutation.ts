import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { AuthApi } from '../api/auth-api.ts';
import type { PasswordRecoveryBodyType } from '../api/authTypes.ts';
import type { DomainException } from '../../../shared';

type PasswordRecoveryResponse = Awaited<
  ReturnType<typeof AuthApi.passwordRecovery>
>;
type PasswordRecoveryError = AxiosError<DomainException>;

export function usePasswordRecoveryMutation(
  options?: UseMutationOptions<
    PasswordRecoveryResponse,
    PasswordRecoveryError,
    PasswordRecoveryBodyType
  >,
) {
  return useMutation<
    PasswordRecoveryResponse,
    PasswordRecoveryError,
    PasswordRecoveryBodyType
  >({
    mutationFn: body => AuthApi.passwordRecovery(body),
    ...options,
  });
}
