import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { AsyncStorage } from '../../../shared';
import { UserApi } from '../api/user-api.ts';

type MeResponse = Awaited<ReturnType<typeof UserApi.me>> | null;

export const meQueryKey = ['auth', 'me'] as const;

export function useMeQuery(
  options?: Omit<UseQueryOptions<MeResponse, Error>, 'queryKey' | 'queryFn'>,
) {
  return useQuery<MeResponse, Error>({
    queryKey: meQueryKey,
    queryFn: async () => {
      const accessToken = await AsyncStorage.get<string>('accessToken');
      if (!accessToken) {
        return null;
      }
      return UserApi.me();
    },
    ...options,
  });
}
