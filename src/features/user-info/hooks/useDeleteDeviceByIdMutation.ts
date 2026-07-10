import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from '@tanstack/react-query';
import { SecureStorage } from '../../../shared';
import { SecurityApi } from '../api/security-api.ts';
import { devicesQueryKey } from './useDevicesQuery.ts';

type DeleteDeviceByIdResponse = Awaited<
  ReturnType<typeof SecurityApi.deleteDeviceById>
>;

export function useDeleteDeviceByIdMutation(
  options?: UseMutationOptions<
    DeleteDeviceByIdResponse,
    Error,
    string
  >,
) {
  const queryClient = useQueryClient();
  const { onSuccess, ...mutationOptions } = options ?? {};

  return useMutation<DeleteDeviceByIdResponse, Error, string>({
    mutationFn: async deviceId => {
      const refreshToken = await SecureStorage.get<string>('refreshToken');

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
