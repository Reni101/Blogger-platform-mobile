import { View } from 'react-native';
import { createProfileScreenStyles } from './ProfileScreen.styles';
import { ProfileWidget } from '../../../widgets/ProfileWidget';
import { useThemedStyles } from '../../../shared';

export function ProfileScreen() {
  const styles = useThemedStyles(createProfileScreenStyles);

  return (
    <View style={styles.container}>
      <ProfileWidget />
    </View>
  );
}
