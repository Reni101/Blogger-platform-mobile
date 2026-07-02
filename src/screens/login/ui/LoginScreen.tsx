import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './LoginScreen.styles';
import { LoginForm } from '../../../features/auth';
import { HeadsetIcon } from '../../../shared';

export function LoginScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconBadge}>
          <HeadsetIcon color="#ffffff" size={34} strokeWidth={2} />
        </View>
        <Text style={styles.title}>
          Blogger
          <Text style={styles.titleAccent}>Platform</Text>
        </Text>
      </View>
      <LoginForm
        onForgotPasswordPress={() =>
          navigation.navigate('forgotPassword' as never)
        }
        onSignUpPress={() => navigation.navigate('register' as never)}
      />
    </View>
  );
}
