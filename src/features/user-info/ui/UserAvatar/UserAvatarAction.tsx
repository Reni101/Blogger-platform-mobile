import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import {
  CameraIcon,
  Spinner,
  useAppTheme,
  useThemedStyles,
} from '../../../../shared';
import { createUserAvatarActionStyles } from './UserAvatar.styles.ts';
import { UserAvatarSelect } from './UserAvatarSelect.tsx';
import { useUploadAvatarMutation } from '../../hooks/useUploadAvatarMutation.ts';
import Toast from 'react-native-toast-message';

export const UserAvatarAction = () => {
  const styles = useThemedStyles(createUserAvatarActionStyles);
  const { colors } = useAppTheme();
  const [isSheetVisible, setIsSheetVisible] = useState(false);
  const showToast = () => {
    Toast.show({
      type: 'error',
      text1: 'Unable to upload avatar',
      text2: 'Please try again.',
      topOffset: 70,
    });
  };

  const { mutate: uploadAvatar, isPending } = useUploadAvatarMutation({
    onError: showToast,
  });

  return (
    <>
      <Pressable
        accessibilityLabel="Change avatar"
        accessibilityRole="button"
        hitSlop={8}
        disabled={isPending}
        onPress={() => {
          setIsSheetVisible(true);
        }}
        style={({ pressed }) => [
          styles.container,
          pressed ? styles.iconButtonPressed : null,
        ]}
      >
        <Text style={styles.label}>Change avatar</Text>
        <View pointerEvents="none" style={styles.iconButton}>
          {isPending ? (
            <Spinner size={'small'} />
          ) : (
            <CameraIcon color={colors.iconPrimary} size={20} strokeWidth={2} />
          )}
        </View>
      </Pressable>

      <UserAvatarSelect
        uploadAvatar={uploadAvatar}
        isPending={isPending}
        isVisible={isSheetVisible}
        onClose={() => {
          setIsSheetVisible(false);
        }}
      />
    </>
  );
};
