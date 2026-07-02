import { Text, View } from 'react-native';
import { styles } from './ProfileScreen.styles';
import { useMeQuery } from '../../../features/auth/hooks/useMeQuery.ts';

export function ProfileScreen() {
  const { data } = useMeQuery();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile screen: {data?.data.login}</Text>
    </View>
  );
}
