import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { AuthApi } from '../api/auth-api.ts';
import { AsyncStorage } from '../../../../shared';

type MeResponse = Awaited<ReturnType<typeof AuthApi.me>> | null;

const meQueryKey = ['auth', 'me'] as const;

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
      return AuthApi.me();
    },
    ...options,
  });
}
