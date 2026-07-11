import { useEffect } from 'react';
import { SecureStorage } from '../../shared';
import { meQueryKey } from '../../entities/user';
import { queryClient } from '../providers/query-client.ts';
import { UserApi } from '../../entities/user/api/user-api.ts';
import { useAuthStore } from './auth-store.ts';

export const UseInit = () => {
  const setLoading = useAuthStore(state => state.setLoading);
  const login = useAuthStore(state => state.login);

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const accessToken = await SecureStorage.get<string>('accessToken');
        const refreshToken = await SecureStorage.get<string>('refreshToken');

        if (accessToken && refreshToken) {
          await queryClient.fetchQuery({
            queryKey: meQueryKey,
            queryFn: () => UserApi.me(),
          });
          await login(accessToken, refreshToken);
        }
      } finally {
        setLoading(false);
      }
    };

    bootstrapAsync();
  }, []);

  return {};
};
