import { useRef } from 'react';
import { Pressable, Text, View } from 'react-native';
import { BottomSheet, useThemedStyles } from '../../../../shared';
import {
  pickAvatarFromCamera,
  pickAvatarFromLibrary,
} from '../../lib/pick-avatar-image.ts';
import { createUserAvatarSelectStyles } from './UserAvatarSelect.styles.ts';

type PendingPicker = 'camera' | 'library';

type UserAvatarSelectProps = {
  isVisible: boolean;
  onClose: () => void;
};

export const UserAvatarSelect = (props: UserAvatarSelectProps) => {
  const { isVisible, onClose } = props;
  const styles = useThemedStyles(createUserAvatarSelectStyles);
  const pendingPickerRef = useRef<PendingPicker | null>(null);

  const openPickerAfterDismiss = (picker: PendingPicker) => {
    pendingPickerRef.current = picker;
    onClose();
  };

  const handleSheetDismissed = () => {
    const picker = pendingPickerRef.current;
    pendingPickerRef.current = null;

    if (picker === 'camera') {
      void pickAvatarFromCamera();
      return;
    }

    if (picker === 'library') {
      void pickAvatarFromLibrary();
    }
  };

  return (
    <BottomSheet
      isVisible={isVisible}
      onClose={onClose}
      onDismissed={handleSheetDismissed}
    >
      {({ close }) => (
        <View style={styles.sheetContent}>
          <Text style={styles.sheetTitle}>Change avatar</Text>

          <Pressable
            onPress={() => {
              openPickerAfterDismiss('camera');
            }}
            style={({ pressed }) => [
              styles.sheetAction,
              pressed ? styles.sheetActionPressed : null,
            ]}
          >
            <Text style={styles.sheetActionText}>Take photo</Text>
          </Pressable>

          <Pressable
            onPress={() => {
              openPickerAfterDismiss('library');
            }}
            style={({ pressed }) => [
              styles.sheetAction,
              pressed ? styles.sheetActionPressed : null,
            ]}
          >
            <Text style={styles.sheetActionText}>Choose from library</Text>
          </Pressable>

          <Pressable
            onPress={close}
            style={({ pressed }) => [
              styles.sheetAction,
              styles.dismissAction,
              pressed ? styles.sheetActionPressed : null,
            ]}
          >
            <Text style={[styles.sheetActionText, styles.dismissActionText]}>
              Dismiss
            </Text>
          </Pressable>
        </View>
      )}
    </BottomSheet>
  );
};
