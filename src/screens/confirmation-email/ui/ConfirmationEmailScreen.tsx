import { Text, View } from 'react-native';
import { ConfirmationEmailForm } from '../../../features/auth';
import {
  MailWarningIcon,
  useAppTheme,
  useThemedStyles,
} from '../../../shared';
import { createConfirmationEmailScreenStyles } from './ConfirmationEmailScreen.styles.ts';

export function ConfirmationEmailScreen() {
  const { colors } = useAppTheme();
  const styles = useThemedStyles(createConfirmationEmailScreenStyles);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.iconBadge}>
            <MailWarningIcon
              color={colors.iconOnAccent}
              size={34}
              strokeWidth={2}
            />
          </View>
          <Text style={styles.title}>
            Confirm
            <Text style={styles.titleAccent}>Email</Text>
          </Text>
        </View>

        <ConfirmationEmailForm />
      </View>
    </View>
  );
}
