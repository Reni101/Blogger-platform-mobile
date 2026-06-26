import { Pressable, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { styles } from './LoginScreen.styles';
import type { RootStackParamList } from '../../../app/navigation/AppNavigation';

type LoginNavigation = NativeStackNavigationProp<RootStackParamList, 'login'>;

export function LoginScreen() {
  const navigation = useNavigation<LoginNavigation>();

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => navigation.replace('mainTabs')}
        style={styles.button}>
        <Text style={styles.buttonText}>Go to app</Text>
      </Pressable>
    </View>
  );
}
