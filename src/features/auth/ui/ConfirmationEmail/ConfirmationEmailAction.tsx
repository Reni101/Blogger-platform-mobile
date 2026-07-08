import { Pressable, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../../app/navigation/AppNavigation.tsx';
import {
  MailWarningIcon,
  useAppTheme,
  useThemedStyles,
} from '../../../../shared';
import { createConfirmationEmailActionStyles } from './ConfirmationEmailAction.styles.ts';

type ConfirmationEmailNavigation = NativeStackNavigationProp<
  RootStackParamList,
  'confirmationEmail'
>;

export const ConfirmationEmailAction = () => {
  const navigation = useNavigation<ConfirmationEmailNavigation>();
  const { colors } = useAppTheme();
  const styles = useThemedStyles(createConfirmationEmailActionStyles);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Confirm email</Text>
      <Pressable
        accessibilityLabel="Confirm email"
        hitSlop={8}
        onPress={() => navigation.navigate('confirmationEmail')}
        style={({ pressed }) => [
          styles.iconButton,
          pressed ? styles.iconButtonPressed : null,
        ]}
      >
        <MailWarningIcon color={colors.iconPrimary} size={20} strokeWidth={2} />
      </Pressable>
    </View>
  );
};
