import { type PropsWithChildren } from 'react';
import {
  Modal as RNModal,
  Pressable,
  View,
} from 'react-native';
import { useThemedStyles } from '../../lib';
import { createModalStyles } from './Modal.styles.ts';

type ModalProps = PropsWithChildren<{
  visible: boolean;
  onClose: () => void;
}>;

export function Modal({ visible, onClose, children }: ModalProps) {
  const styles = useThemedStyles(createModalStyles);

  return (
    <RNModal
      animationType="fade"
      onRequestClose={onClose}
      transparent
      visible={visible}
    >
      <View style={styles.overlay}>
        <Pressable
          accessibilityLabel="Close modal"
          accessibilityRole="button"
          onPress={onClose}
          style={styles.backdrop}
        />
        <View style={styles.content}>{children}</View>
      </View>
    </RNModal>
  );
}
