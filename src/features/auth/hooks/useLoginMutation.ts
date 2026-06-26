import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import { AuthApi } from '../api/auth-api.ts';
import type { LoginBodyType } from '../api/authTypes.ts';

type LoginResponse = Awaited<ReturnType<typeof AuthApi.login>>;

export function useLoginMutation(
  options?: UseMutationOptions<LoginResponse, Error, LoginBodyType>,
) {
  return useMutation<LoginResponse, Error, LoginBodyType>({
    mutationFn: body => AuthApi.login(body),
    ...options,

  });
}
