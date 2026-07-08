import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useLogoutMutation } from '../../hooks/useLogoutMutation.ts';
import {
  LogoutIcon,
  useAppTheme,
  useThemedStyles,
} from '../../../../shared';
import { createLogoutStyles } from './Logout.styles.ts';
import { LogoutConfirmModal } from './LogoutConfirmModal.tsx';

export const Logout = () => {
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
      <View style={styles.container}>
        <Text style={styles.label}>Выйти</Text>
        <Pressable
          accessibilityLabel="Log out"
          disabled={isPending}
          hitSlop={8}
          onPress={handleOpenConfirm}
          style={({ pressed }) => [
            styles.iconButton,
            pressed || isPending ? styles.iconButtonPressed : null,
          ]}
        >
          <LogoutIcon color={colors.danger} size={20} />
        </Pressable>
      </View>
      <LogoutConfirmModal
        onClose={onClose}
        handleConfirmLogout={handleConfirmLogout}
        isPending={isPending}
        isVisible={isVisible}
      />
    </>
  );
};
