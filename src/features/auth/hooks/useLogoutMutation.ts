import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import { AuthApi } from '../api/auth-api.ts';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../app/navigation/AppNavigation.tsx';
import { meQueryKey } from '../../../entities/user';
import { useAuthStore } from '../model/store/auth-store.ts';
import { devicesQueryKey } from '../../user-info';
import { avatarQueryKey } from '../../user-info/hooks/useAvatarQuery.ts';

type LogoutResponse = Awaited<ReturnType<typeof AuthApi.logOut>> | null;
type LoginNavigation = NativeStackNavigationProp<RootStackParamList, 'login'>;

export function useLogoutMutation(
  options?: UseMutationOptions<LogoutResponse, Error, void>,
) {
  const navigation = useNavigation<LoginNavigation>();
  const logout = useAuthStore(s => s.logout);
  const { onSuccess, onError, ...mutationOptions } = options ?? {};
  const refreshToken = useAuthStore(s => s.refreshToken);

  return useMutation<LogoutResponse, Error, void>({
    mutationFn: async () => {
      if (!refreshToken) {
        await logout();
        navigation.replace('login');
        return null;
      }

      return AuthApi.logOut(refreshToken);
    },
    onSuccess: async (data, variables, onMutateResult, context) => {
      await logout();
      context.client.removeQueries({ queryKey: meQueryKey });
      context.client.removeQueries({ queryKey: devicesQueryKey });
      context.client.removeQueries({ queryKey: avatarQueryKey });
      navigation.replace('login');
      await onSuccess?.(data, variables, onMutateResult, context);
    },
    ...mutationOptions,
    onError: async (data, variables, onMutateResult, context) => {
      await logout();
      await onError?.(data, variables, onMutateResult, context);
    },
  });
}
