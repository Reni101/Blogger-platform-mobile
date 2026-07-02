import { Pressable } from 'react-native';
import { useLogoutMutation } from '../../hooks/useLogoutMutation.ts';
import { LogoutIcon } from '../../../../shared';

type LogoutBtnProps = {
  color?: string;
};

export const LogoutBtn = ({ color = '#1c1f2e' }: LogoutBtnProps) => {
  const { mutate, isPending } = useLogoutMutation();

  const handlePress = () => {
    mutate();
  };

  return (
    <Pressable
      accessibilityLabel="Log out"
      disabled={isPending}
      hitSlop={8}
      onPress={handlePress}
      style={({ pressed }) => ({
        opacity: pressed || isPending ? 0.6 : 1,
        padding: 4,
      })}
    >
      <LogoutIcon color={color} size={22} />
    </Pressable>
  );
};
