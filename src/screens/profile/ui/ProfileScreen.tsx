import { View } from 'react-native';
import { createProfileScreenStyles } from './ProfileScreen.styles';
import { useMeQuery } from '../../../features/user-accaunts/auth/hooks/useMeQuery.ts';
import { ProfileWidget } from '../../../widgets/ProfileWidget';
import { useThemedStyles } from '../../../shared';

export function ProfileScreen() {
  const styles = useThemedStyles(createProfileScreenStyles);
  useMeQuery();
  return (
    <View style={styles.container}>
      <ProfileWidget />
    </View>
  );
}
