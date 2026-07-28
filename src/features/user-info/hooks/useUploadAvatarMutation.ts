import {
  useMutation,
  type UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import type { Asset } from 'react-native-image-picker';

import { meQueryKey } from '../../../entities/user';
import { AvatarApi } from '../api/avatar-api.ts';
import { avatarQueryKey } from './useAvatarQuery.ts';

type UploadAvatarResponse = Awaited<ReturnType<typeof AvatarApi.uploadAvatar>>;

export function useUploadAvatarMutation(
  options?: UseMutationOptions<UploadAvatarResponse, Error, Asset>,
) {
  const queryClient = useQueryClient();
  const { onSuccess, ...mutationOptions } = options ?? {};

  return useMutation<UploadAvatarResponse, Error, Asset>({
    mutationFn: file => AvatarApi.uploadAvatar(file),
    onSuccess: async (data, variables, onMutateResult, context) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: meQueryKey }),
        queryClient.refetchQueries({ queryKey: avatarQueryKey }),
      ]);
      await onSuccess?.(data, variables, onMutateResult, context);
    },
    ...mutationOptions,
  });
}
