import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { useAuthStore } from '../../auth';
import { AvatarApi, type UserAvatar } from '../api/avatar-api.ts';

export const avatarQueryKey = ['user', 'avatar'] as const;

export function useAvatarQuery(
  options?: Omit<
    UseQueryOptions<UserAvatar | null, Error>,
    'queryKey' | 'queryFn'
  >,
) {
  const accessToken = useAuthStore(s => s.accessToken);

  return useQuery<UserAvatar | null, Error>({
    queryKey: avatarQueryKey,
    queryFn: () => AvatarApi.getAvatar(),
    enabled: !!accessToken,
    // Matches backend Cache-Control: private, max-age=3600
    staleTime: 60 * 60 * 1000,
    ...options,
  });
}
