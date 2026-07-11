import { memo, useState } from 'react';
import { Pressable, Text } from 'react-native';
import {
  TriangleAlertIcon,
  useAppTheme,
  useThemedStyles,
} from '../../../../../shared';
import { DeviceLogoutConfirmModal } from '../DeviceLogoutConfirmModal.tsx';
import { createMainDeviceLogoutActionStyles } from './MainDeviceLogoutAction.styles.ts';
import { useDeleteOtherDevicesMutation } from '../../../hooks/useDeleteOtherDevicesMutation.ts';
import { useDevicesQuery } from '../../../hooks/useDevicesQuery.ts';

export const MainDeviceLogoutAction = memo(() => {
  const { colors } = useAppTheme();
  const styles = useThemedStyles(createMainDeviceLogoutActionStyles);
  const { data } = useDevicesQuery();

  const [isVisible, setIsVisible] = useState(false);

  const { mutate, isPending } = useDeleteOtherDevicesMutation({
    onSuccess: () => setIsVisible(false),
  });

  if ((data?.otherDevices.length ?? 0) === 0) {
    return null;
  }

  return (
    <>
      <Pressable
        disabled={isPending}
        hitSlop={8}
        onPress={() => setIsVisible(true)}
        style={({ pressed }) => [
          styles.container,
          pressed || isPending ? styles.pressed : null,
        ]}
      >
        <TriangleAlertIcon color={colors.danger} size={16} strokeWidth={2} />
        <Text style={styles.label}>Log out from all other devices</Text>
      </Pressable>

      <DeviceLogoutConfirmModal
        isPending={isPending}
        isVisible={isVisible}
        onClose={() => {
          if (!isPending) {
            setIsVisible(false);
          }
        }}
        onConfirm={mutate}
      />
    </>
  );
});
