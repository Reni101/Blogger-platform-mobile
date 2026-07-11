import {
  useMutation,
  type UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { SecurityApi } from '../api/security-api.ts';
import { devicesQueryKey } from './useDevicesQuery.ts';
import { useAuthStore } from '../../auth';

type DeleteOtherDevicesResponse = Awaited<
  ReturnType<typeof SecurityApi.deleteOtherDevices>
>;

export function useDeleteOtherDevicesMutation(
  options?: UseMutationOptions<DeleteOtherDevicesResponse, Error, void>,
) {
  const queryClient = useQueryClient();
  const { onSuccess, ...mutationOptions } = options ?? {};
  const refreshToken = useAuthStore(s => s.refreshToken);

  return useMutation<DeleteOtherDevicesResponse, Error, void>({
    mutationFn: async () => {
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
