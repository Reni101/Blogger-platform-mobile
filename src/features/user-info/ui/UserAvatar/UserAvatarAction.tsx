import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import {
  CameraIcon,
  useAppTheme,
  useThemedStyles,
} from '../../../../shared';
import { createUserAvatarActionStyles } from './UserAvatar.styles.ts';
import { UserAvatarSelect } from './UserAvatarSelect.tsx';

export const UserAvatarAction = () => {
  const styles = useThemedStyles(createUserAvatarActionStyles);
  const { colors } = useAppTheme();
  const [isSheetVisible, setIsSheetVisible] = useState(false);

  return (
    <>
      <Pressable
        accessibilityLabel="Change avatar"
        accessibilityRole="button"
        hitSlop={8}
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
          <CameraIcon color={colors.iconPrimary} size={20} strokeWidth={2} />
        </View>
      </Pressable>

      <UserAvatarSelect
        isVisible={isSheetVisible}
        onClose={() => {
          setIsSheetVisible(false);
        }}
      />
    </>
  );
};
