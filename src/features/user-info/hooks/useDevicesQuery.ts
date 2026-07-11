import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { SecurityApi } from '../api/security-api.ts';
import { useAuthStore } from '../../auth';

type DevicesResponse = Awaited<ReturnType<typeof SecurityApi.getDevices>>;

export const devicesQueryKey = ['security', 'devices'] as const;

export function useDevicesQuery(
  options?: Omit<
    UseQueryOptions<DevicesResponse, Error>,
    'queryKey' | 'queryFn'
  >,
) {
  const refreshToken = useAuthStore(s => s.refreshToken);
  return useQuery<DevicesResponse, Error>({
    queryKey: devicesQueryKey,
    queryFn: async () => {
      if (!refreshToken) {
        throw new Error('Refresh token is missing');
      }

      return SecurityApi.getDevices(refreshToken);
    },
    ...options,
  });
}
