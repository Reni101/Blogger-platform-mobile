import { memo } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Modal, type ModalPropsType, useThemedStyles } from '../../../../shared';
import { createDeviceLogoutConfirmModalStyles } from './DeviceLogoutConfirmModal.styles.ts';

type DeviceLogoutConfirmModalProps = {
  isPending: boolean;
  onConfirm: () => void;
} & ModalPropsType;

export const DeviceLogoutConfirmModal = memo(
  ({ isVisible, onClose, isPending, onConfirm }: DeviceLogoutConfirmModalProps) => {
    const styles = useThemedStyles(createDeviceLogoutConfirmModalStyles);

    return (
      <Modal onClose={onClose} visible={isVisible}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Are you sure?</Text>

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
              onPress={onConfirm}
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
  },
);
