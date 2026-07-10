import { memo } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { ProfileStackParamList } from '../../../../app/navigation/ProfileStackNavigator.tsx';
import {
  MailWarningIcon,
  useAppTheme,
  useThemedStyles,
} from '../../../../shared';
import { createConfirmationEmailActionStyles } from './ConfirmationEmailAction.styles.ts';

type ConfirmationEmailNavigation = NativeStackNavigationProp<
  ProfileStackParamList,
  'confirmationEmail'
>;

export const ConfirmationEmailAction = memo(() => {
  const navigation = useNavigation<ConfirmationEmailNavigation>();
  const { colors } = useAppTheme();
  const styles = useThemedStyles(createConfirmationEmailActionStyles);

  return (
    <Pressable
      accessibilityLabel="Confirm email"
      hitSlop={8}
      onPress={() => navigation.navigate('confirmationEmail')}
      style={({ pressed }) => [
        styles.container,
        pressed ? styles.iconButtonPressed : null,
      ]}
    >
      <Text style={styles.label}>Confirm email</Text>
      <View pointerEvents="none" style={styles.iconButton}>
        <MailWarningIcon color={colors.warning} size={20} strokeWidth={2} />
      </View>
    </Pressable>
  );
});
