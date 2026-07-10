import { memo, type ComponentProps, type PropsWithChildren } from 'react';
import {
  Modal as RNModal,
  Pressable,
  View,
} from 'react-native';
import { useThemedStyles } from '../../lib';
import { createModalStyles } from './Modal.styles.ts';

type ModalProps = PropsWithChildren<
  Omit<ComponentProps<typeof RNModal>, 'children' | 'onRequestClose'> & {
    onClose: () => void;
  }
>;

export const Modal = memo(({
  visible,
  onClose,
  children,
  ...modalProps
}: ModalProps) => {
  const styles = useThemedStyles(createModalStyles);

  return (
    <RNModal
      animationType="fade"
      onRequestClose={onClose}
      transparent
      visible={visible}
      {...modalProps}
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
});
