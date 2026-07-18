import { Pressable, Text, View } from 'react-native';
import { CameraIcon, useAppTheme, useThemedStyles } from '../../../../shared';
import { createUserAvatarActionStyles } from './UserAvatar.styles.ts';

export const UserAvatarAction = () => {
  const styles = useThemedStyles(createUserAvatarActionStyles);
  const { colors } = useAppTheme();

  return (
    <Pressable
      accessibilityLabel="Confirm email"
      hitSlop={8}
      onPress={() => {}}
      style={({ pressed }) => [
        styles.container,
        pressed ? styles.iconButtonPressed : null,
      ]}
    >
      <Text style={styles.label}>Change avatar</Text>
      <View pointerEvents="none" style={styles.iconButton}>
        <CameraIcon color={colors.iconPrimary} size={20} strokeWidth={2} />
      </View>
    </Pressable>
  );
};
