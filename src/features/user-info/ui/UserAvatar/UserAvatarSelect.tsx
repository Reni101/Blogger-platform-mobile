import { Pressable, Text, View } from 'react-native';
import { BottomSheetControls } from '../../../../shared/ui/BottomSheet/BottomSheet.tsx';
import { FC } from 'react';
import {
  pickAvatarFromCamera,
  pickAvatarFromLibrary,
} from '../../lib/pick-avatar-image.ts';
import { useThemedStyles } from '../../../../shared';
import { createUserAvatarSelectStyles } from './UserAvatarSelect.styles.ts';

type PropsType = {} & BottomSheetControls;

export const UserAvatarSelect: FC<PropsType> = ({ close }) => {
  const styles = useThemedStyles(createUserAvatarSelectStyles);

  return (
    <View style={styles.sheetContent}>
      <Text style={styles.sheetTitle}>Change avatar</Text>

      <Pressable
        onPress={async () => {
          close();
          const asset = await pickAvatarFromCamera();
        }}
        style={({ pressed }) => [
          styles.sheetAction,
          pressed ? styles.sheetActionPressed : null,
        ]}
      >
        <Text style={styles.sheetActionText}>Take photo</Text>
      </Pressable>

      <Pressable
        onPress={async () => {
          close();
          const asset = await pickAvatarFromLibrary();
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
  );
};
