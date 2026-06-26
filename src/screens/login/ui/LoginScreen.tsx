import { Pressable, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { styles } from './LoginScreen.styles';
import type { RootStackParamList } from '../../../app/navigation/AppNavigation';
import { useLoginMutation } from '../../../features/auth';

type LoginNavigation = NativeStackNavigationProp<RootStackParamList, 'login'>;

export function LoginScreen() {
  const navigation = useNavigation<LoginNavigation>();
  const { mutate, isPending } = useLoginMutation({
    onSuccess: () => {
      navigation.replace('mainTabs');
    },
  });

  return (
    <View style={styles.container}>
      <Pressable
        disabled={isPending}
        onPress={() => {
          const body = {
            login: 'maxim101',
            password: 'renixx12',
            rememberMe: true,
          };
          mutate(body);
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          {isPending ? 'Loading...' : 'Go to app'}
        </Text>
      </Pressable>
    </View>
  );
}
