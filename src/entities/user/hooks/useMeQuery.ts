import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { UserApi } from '../api/user-api.ts';
import { useAuthStore } from '../../../features/auth';

type MeResponse = Awaited<ReturnType<typeof UserApi.me>> | null;
export const meQueryKey = ['auth', 'me'] as const;

export function useMeQuery(
  options?: Omit<UseQueryOptions<MeResponse, Error>, 'queryKey' | 'queryFn'>,
) {
  const accessToken = useAuthStore(s => s.accessToken);
  return useQuery<MeResponse, Error>({
    queryKey: meQueryKey,
    queryFn: () => UserApi.me(),
    enabled: !!accessToken,
    ...options,
  });
}
