import { memo } from 'react';
import { Modal, ModalPropsType, useThemedStyles } from '../../../../shared';
import { Pressable, Text, View } from 'react-native';
import { createLogoutStyles } from './Logout.styles.ts';

type Props = {
  isPending: boolean;
  handleConfirmLogout: () => void;
} & ModalPropsType;

export const LogoutConfirmModal = memo((props: Props) => {
  const { onClose, isVisible, isPending, handleConfirmLogout } = props;
  const styles = useThemedStyles(createLogoutStyles);

  return (
    <Modal onClose={onClose} visible={isVisible}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Are you sure you want to log out?</Text>

        <View style={styles.modalActions}>
          <Pressable
            disabled={isPending}
            onPress={onClose}
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
  );
});
