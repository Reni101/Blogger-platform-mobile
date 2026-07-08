import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { AuthApi } from '../api/auth-api.ts';
import type { NewPasswordBodyType } from '../api/authTypes.ts';
import type { DomainException } from '../../../shared';

type NewPasswordResponse = Awaited<ReturnType<typeof AuthApi.newPassword>>;
type NewPasswordError = AxiosError<DomainException>;

export function useNewPasswordMutation(
  options?: UseMutationOptions<
    NewPasswordResponse,
    NewPasswordError,
    NewPasswordBodyType
  >,
) {
  return useMutation<NewPasswordResponse, NewPasswordError, NewPasswordBodyType>({
    mutationFn: body => AuthApi.newPassword(body),
    ...options,
  });
}
