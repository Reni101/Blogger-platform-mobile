import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import {
  BottomSheet,
  CameraIcon,
  useAppTheme,
  useThemedStyles,
} from '../../../../shared';
import { createUserAvatarActionStyles } from './UserAvatar.styles.ts';
import {
  pickAvatarFromCamera,
  pickAvatarFromLibrary,
} from '../../lib/pick-avatar-image.ts';

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

      <BottomSheet
        isVisible={isSheetVisible}
        onClose={() => {
          setIsSheetVisible(false);
        }}
      >
        {({ close }) => (
          <View style={styles.sheetContent}>
            <Text style={styles.sheetTitle}>Change avatar</Text>

            <Pressable
              onPress={() => {
                close();
                void pickAvatarFromCamera();
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
                close();
                void pickAvatarFromLibrary();
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
    </>
  );
};
