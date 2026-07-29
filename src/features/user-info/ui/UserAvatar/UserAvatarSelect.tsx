import { useRef, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { BottomSheet, useThemedStyles } from '../../../../shared';
import { useUploadAvatarMutation } from '../../hooks/useUploadAvatarMutation.ts';
import {
  pickAvatarFromCamera,
  pickAvatarFromLibrary,
} from '../../lib/pick-avatar-image.ts';
import { createUserAvatarSelectStyles } from './UserAvatarSelect.styles.ts';
import Toast from 'react-native-toast-message';

type PendingPicker = 'camera' | 'library';

type UserAvatarSelectProps = {
  isVisible: boolean;
  onClose: () => void;
};

export const UserAvatarSelect = (props: UserAvatarSelectProps) => {
  const { isVisible, onClose } = props;
  const styles = useThemedStyles(createUserAvatarSelectStyles);
  const pendingPickerRef = useRef<PendingPicker | null>(null);
  const [isOpeningPicker, setIsOpeningPicker] = useState(false);

  const showToast = () => {
    Toast.show({
      type: 'error',
      text1: 'Unable to upload avatar',
      text2: 'Please try again.',
      topOffset: 70,
    });
  };

  const { mutate: uploadAvatar, isPending } = useUploadAvatarMutation({
    onError: showToast,
  });

  const openPickerAfterDismiss = (picker: PendingPicker) => {
    // Skip sheet close animation so the native picker can present as soon as
    // the RN Modal is torn down (iOS cannot stack presenters cleanly).
    pendingPickerRef.current = picker;
    setIsOpeningPicker(true);
    onClose();
  };

  const handleSheetDismissed = async () => {
    const picker = pendingPickerRef.current;
    pendingPickerRef.current = null;
    setIsOpeningPicker(false);

    if (picker === 'camera') {
      const asset = await pickAvatarFromCamera();
      if (asset) {
        uploadAvatar(asset);
      }
      return;
    }

    if (picker === 'library') {
      const asset = await pickAvatarFromLibrary();
      if (asset) {
        uploadAvatar(asset);
      }
    }
  };

  return (
    <BottomSheet
      animationDuration={isOpeningPicker ? 0 : undefined}
      isVisible={isVisible}
      onClose={onClose}
      onDismissed={handleSheetDismissed}
    >
      {({ close }) => (
        <View style={styles.sheetContent}>
          <Text style={styles.sheetTitle}>Change avatar</Text>

          <Pressable
            disabled={isPending}
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
            disabled={isPending}
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
