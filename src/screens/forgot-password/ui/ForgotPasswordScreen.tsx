import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HeadsetIcon, useAppTheme, useThemedStyles } from '../../../shared';
import { PasswordRecovery } from '../../../features/user-accaunts/auth';
import { createForgotPasswordScreenStyles } from './ForgotPasswordScreen.styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../app/navigation/AppNavigation.tsx';

type ForgotPasswordNavigation = NativeStackNavigationProp<
  RootStackParamList,
  'forgotPassword'
>;

export function ForgotPasswordScreen() {
  const navigation = useNavigation<ForgotPasswordNavigation>();
  const { colors } = useAppTheme();
  const styles = useThemedStyles(createForgotPasswordScreenStyles);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconBadge}>
          <HeadsetIcon color={colors.iconOnAccent} size={34} strokeWidth={2} />
        </View>
        <Text style={styles.title}>
          Reset
          <Text style={styles.titleAccent}>Password</Text>
        </Text>
      </View>

      <PasswordRecovery onSignInPress={() => navigation.replace('login')} />
    </View>
  );
}
