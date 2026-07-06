import { Pressable, Text, View } from 'react-native';
import { useLogoutMutation } from '../../hooks/useLogoutMutation.ts';
import { LogoutIcon } from '../../../../shared';
import { styles } from './Logout.styles';

type LogoutBtnProps = {
  color?: string;
};

export const Logout = ({ color = '#cb3a31' }: LogoutBtnProps) => {
  const { mutate, isPending } = useLogoutMutation();

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
        <LogoutIcon color={color} size={20} />
      </Pressable>
    </View>
  );
};
