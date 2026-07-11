import {
  useMutation,
  type UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';

import { SecurityApi } from '../api/security-api.ts';
import { devicesQueryKey } from './useDevicesQuery.ts';
import { useAuthStore } from '../../auth';

type DeleteDeviceByIdResponse = Awaited<
  ReturnType<typeof SecurityApi.deleteDeviceById>
>;

export function useDeleteDeviceByIdMutation(
  options?: UseMutationOptions<DeleteDeviceByIdResponse, Error, string>,
) {
  const refreshToken = useAuthStore(s => s.refreshToken);
  const queryClient = useQueryClient();
  const { onSuccess, ...mutationOptions } = options ?? {};

  return useMutation<DeleteDeviceByIdResponse, Error, string>({
    mutationFn: async deviceId => {
      if (!refreshToken) {
        throw new Error('Refresh token is missing');
      }

      return SecurityApi.deleteDeviceById(refreshToken, deviceId);
    },
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: devicesQueryKey });
      await onSuccess?.(data, variables, onMutateResult, context);
    },
    ...mutationOptions,
  });
}
