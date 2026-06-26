import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import { AuthApi } from '../api/auth-api.ts';
import type { LoginBodyType } from '../api/authTypes.ts';

type LoginResponse = Awaited<ReturnType<typeof AuthApi.login>>;
type LoginError = Error;

export function useLoginMutation(
  options?: UseMutationOptions<LoginResponse, LoginError, LoginBodyType>,
) {
  return useMutation<LoginResponse, LoginError, LoginBodyType>({
    mutationFn: body => AuthApi.login(body),
    ...options,
  });
}
