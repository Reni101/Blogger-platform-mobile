import { memo } from 'react';
import { Pressable, Text, View } from 'react-native';
import {
  TabletSmartphoneIcon,
  useAppTheme,
  useThemedStyles,
} from '../../../../shared';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { ProfileStackParamList } from '../../../../app/navigation/ProfileStackNavigator.tsx';
import { createDevicesActionStyles } from './DevicesAction.styles.ts';

type ConfirmationEmailNavigation = NativeStackNavigationProp<
  ProfileStackParamList,
  'devices'
>;

export const DevicesAction = memo(() => {
  const navigation = useNavigation<ConfirmationEmailNavigation>();
  const { colors } = useAppTheme();
  const styles = useThemedStyles(createDevicesActionStyles);

  return (
    <Pressable
      accessibilityLabel="Confirm email"
      hitSlop={8}
      onPress={() => navigation.navigate('devices')}
      style={({ pressed }) => [
        styles.container,
        pressed ? styles.iconButtonPressed : null,
      ]}
    >
      <Text style={styles.label}>Devices</Text>
      <View pointerEvents="none" style={styles.iconButton}>
        <TabletSmartphoneIcon
          color={colors.iconPrimary}
          size={20}
          strokeWidth={2}
        />
      </View>
    </Pressable>
  );
});
