import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useLogoutMutation } from '../../hooks/useLogoutMutation.ts';
import {
  LogoutIcon,
  Modal,
  useAppTheme,
  useThemedStyles,
} from '../../../../../shared';
import { createLogoutStyles } from './Logout.styles.ts';

export const Logout = () => {
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const { mutate, isPending } = useLogoutMutation();
  const { colors } = useAppTheme();
  const styles = useThemedStyles(createLogoutStyles);

  const handleOpenConfirm = () => {
    setIsConfirmVisible(true);
  };

  const handleCloseConfirm = () => {
    setIsConfirmVisible(false);
  };

  const handleConfirmLogout = () => {
    setIsConfirmVisible(false);
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

      <Modal onClose={handleCloseConfirm} visible={isConfirmVisible}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            Are you sure you want to log out?
          </Text>

          <View style={styles.modalActions}>
            <Pressable
              disabled={isPending}
              onPress={handleCloseConfirm}
              style={({ pressed }) => [
                styles.modalButton,
                styles.cancelButton,
                pressed ? styles.modalButtonPressed : null,
              ]}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </Pressable>

            <Pressable
              disabled={isPending}
              onPress={handleConfirmLogout}
              style={({ pressed }) => [
                styles.modalButton,
                styles.confirmButton,
                pressed || isPending ? styles.modalButtonPressed : null,
              ]}
            >
              <Text style={styles.confirmButtonText}>
                {isPending ? 'Logging out...' : 'Log out'}
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
};
