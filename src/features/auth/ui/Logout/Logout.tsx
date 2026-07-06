import { Pressable, Text, View } from 'react-native';
import { useLogoutMutation } from '../../hooks/useLogoutMutation.ts';
import { LogoutIcon, useAppTheme, useThemedStyles } from '../../../../shared';
import { createLogoutStyles } from './Logout.styles';

export const Logout = () => {
  const { mutate, isPending } = useLogoutMutation();
  const { colors } = useAppTheme();
  const styles = useThemedStyles(createLogoutStyles);

  const handlePress = () => {
    mutate();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Выйти</Text>
      <Pressable
        accessibilityLabel="Log out"
        disabled={isPending}
        hitSlop={8}
        onPress={handlePress}
        style={({ pressed }) => [
          styles.iconButton,
          pressed || isPending ? styles.iconButtonPressed : null,
        ]}
      >
        <LogoutIcon color={colors.danger} size={20} />
      </Pressable>
    </View>
  );
};
