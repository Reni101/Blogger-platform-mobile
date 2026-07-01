import { Text, View } from 'react-native';
import { styles } from './LoginScreen.styles';
import { LoginForm } from '../../../features/auth';
import { Headset } from '../../../shared/ui/svg/headset-icon.tsx';

export function LoginScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconBadge}>
          <Headset color="#ffffff" size={34} strokeWidth={2} />
        </View>
        <Text style={styles.title}>
          Music
          <Text style={styles.titleAccent}>Fun</Text>
        </Text>
      </View>
      <LoginForm />
    </View>
  );
}
