import { View } from 'react-native';
import { styles } from './ProfileScreen.styles';
import { useMeQuery } from '../../../features/auth/hooks/useMeQuery.ts';
import { ProfileWidget } from '../../../widgets/ProfileWidget';

export function ProfileScreen() {
  useMeQuery();
  return (
    <View style={styles.container}>
      <ProfileWidget />
    </View>
  );
}
