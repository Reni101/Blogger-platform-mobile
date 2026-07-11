import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { SecurityApi } from '../api/security-api.ts';
import { useAuthStore } from '../../auth';
import { decodeJwtPayload } from '../../../shared';
import { splitDevices } from '../lib/split-devices.ts';
import type { DeviceType } from '../model/types/DeviceType.ts';

type AccessTokenPayload = {
  deviceId?: string;
};

export type DevicesQueryData = {
  mainDevice: DeviceType | null;
  otherDevices: DeviceType[];
};

export const devicesQueryKey = ['security', 'devices'] as const;

export function useDevicesQuery(
  options?: Omit<
    UseQueryOptions<DevicesQueryData, Error>,
    'queryKey' | 'queryFn'
  >,
) {
  const refreshToken = useAuthStore(s => s.refreshToken);
  return useQuery<DevicesQueryData, Error>({
    queryKey: devicesQueryKey,
    queryFn: async () => {
      if (!refreshToken) {
        throw new Error('Refresh token is missing');
      }

      const res = await SecurityApi.getDevices(refreshToken);
      const accessToken = useAuthStore.getState().accessToken;
      const payload = accessToken
        ? decodeJwtPayload<AccessTokenPayload>(accessToken)
        : null;

      return splitDevices(res.data, payload?.deviceId ?? null);
    },
    ...options,
  });
}
