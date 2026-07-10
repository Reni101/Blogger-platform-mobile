import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { SecureStorage } from '../../../shared';
import { SecurityApi } from '../api/security-api.ts';

type DevicesResponse = Awaited<ReturnType<typeof SecurityApi.getDevices>>;

export const devicesQueryKey = ['security', 'devices'] as const;

export function useDevicesQuery(
  options?: Omit<
    UseQueryOptions<DevicesResponse, Error>,
    'queryKey' | 'queryFn'
  >,
) {
  return useQuery<DevicesResponse, Error>({
    queryKey: devicesQueryKey,
    queryFn: async () => {
      const refreshToken = await SecureStorage.get<string>('refreshToken');

      if (!refreshToken) {
        throw new Error('Refresh token is missing');
      }

      return SecurityApi.getDevices(refreshToken);
    },
    ...options,
  });
}
