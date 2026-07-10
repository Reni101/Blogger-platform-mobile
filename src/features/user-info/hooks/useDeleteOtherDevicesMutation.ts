import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from '@tanstack/react-query';
import { SecureStorage } from '../../../shared';
import { SecurityApi } from '../api/security-api.ts';
import { devicesQueryKey } from './useDevicesQuery.ts';

type DeleteOtherDevicesResponse = Awaited<
  ReturnType<typeof SecurityApi.deleteOtherDevices>
>;

export function useDeleteOtherDevicesMutation(
  options?: UseMutationOptions<DeleteOtherDevicesResponse, Error, void>,
) {
  const queryClient = useQueryClient();
  const { onSuccess, ...mutationOptions } = options ?? {};

  return useMutation<DeleteOtherDevicesResponse, Error, void>({
    mutationFn: async () => {
      const refreshToken = await SecureStorage.get<string>('refreshToken');

      if (!refreshToken) {
        throw new Error('Refresh token is missing');
      }

      return SecurityApi.deleteOtherDevices(refreshToken);
    },
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: devicesQueryKey });
      await onSuccess?.(data, variables, onMutateResult, context);
    },
    ...mutationOptions,
  });
}
