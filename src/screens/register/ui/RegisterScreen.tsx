import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HeadsetIcon, useAppTheme, useThemedStyles } from '../../../shared';
import { RegistrationForm } from '../../../features/user-accaunts/auth';
import { createRegisterScreenStyles } from './RegisterScreen.styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../app/navigation/AppNavigation.tsx';

type RegisterNavigation = NativeStackNavigationProp<RootStackParamList, 'register'>;

export function RegisterScreen() {
  const navigation = useNavigation<RegisterNavigation>();
  const { colors } = useAppTheme();
  const styles = useThemedStyles(createRegisterScreenStyles);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconBadge}>
          <HeadsetIcon color={colors.iconOnAccent} size={34} strokeWidth={2} />
        </View>
        <Text style={styles.title}>
          Create
          <Text style={styles.titleAccent}>Account</Text>
        </Text>
      </View>
      <RegistrationForm onSignInPress={() => navigation.replace('login')} />
    </View>
  );
}
