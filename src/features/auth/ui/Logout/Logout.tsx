import { memo, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useLogoutMutation } from '../../hooks/useLogoutMutation.ts';
import {
  LogoutIcon,
  useAppTheme,
  useThemedStyles,
} from '../../../../shared';
import { createLogoutStyles } from './Logout.styles.ts';
import { LogoutConfirmModal } from './LogoutConfirmModal.tsx';

export const Logout = memo(() => {
  const [isVisible, setIsVisible] = useState(false);
  const { mutate, isPending } = useLogoutMutation();
  const { colors } = useAppTheme();
  const styles = useThemedStyles(createLogoutStyles);

  const handleOpenConfirm = () => {
    setIsVisible(true);
  };

  const onClose = () => {
    setIsVisible(false);
  };

  const handleConfirmLogout = () => {
    setIsVisible(false);
    mutate();
  };

  return (
    <>
      <Pressable
        accessibilityLabel="Log out"
        disabled={isPending}
        hitSlop={8}
        onPress={handleOpenConfirm}
        style={({ pressed }) => [
          styles.container,
          pressed || isPending ? styles.iconButtonPressed : null,
        ]}
      >
        <Text style={styles.label}>Выйти</Text>
        <View pointerEvents="none" style={styles.iconButton}>
          <LogoutIcon color={colors.danger} size={20} />
        </View>
      </Pressable>
      <LogoutConfirmModal
        onClose={onClose}
        handleConfirmLogout={handleConfirmLogout}
        isPending={isPending}
        isVisible={isVisible}
      />
    </>
  );
});
