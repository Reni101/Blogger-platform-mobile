import { memo, useState } from 'react';
import { Pressable, Text } from 'react-native';
import {
  TriangleAlertIcon,
  useAppTheme,
  useThemedStyles,
} from '../../../../shared';
import { useDeleteDeviceByIdMutation } from '../../hooks/useDeleteDeviceByIdMutation.ts';
import { useDeleteOtherDevicesMutation } from '../../hooks/useDeleteOtherDevicesMutation.ts';
import { DeviceLogoutConfirmModal } from './DeviceLogoutConfirmModal.tsx';
import { createDeviceLogoutActionStyles } from './DeviceLogoutAction.styles.ts';

type DeviceLogoutActionProps = {
  variant: 'main' | 'other';
  deviceId?: string;
};

const LABELS = {
  main: 'Log out from all other devices',
  other: 'Log out from device',
} as const;

export const DeviceLogoutAction = memo(
  ({ variant, deviceId }: DeviceLogoutActionProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const { colors } = useAppTheme();
    const styles = useThemedStyles(createDeviceLogoutActionStyles);

    const { mutate: deleteOtherDevices, isPending: isDeletingOthers } =
      useDeleteOtherDevicesMutation({
        onSuccess: () => setIsVisible(false),
      });

    const { mutate: deleteDeviceById, isPending: isDeletingDevice } =
      useDeleteDeviceByIdMutation({
        onSuccess: () => setIsVisible(false),
      });

    const isPending = isDeletingOthers || isDeletingDevice;

    const handleOpenConfirm = () => {
      setIsVisible(true);
    };

    const handleClose = () => {
      if (!isPending) {
        setIsVisible(false);
      }
    };

    const handleConfirm = () => {
      if (variant === 'main') {
        deleteOtherDevices();
        return;
      }

      if (deviceId) {
        deleteDeviceById(deviceId);
      }
    };

    return (
      <>
        <Pressable
          accessibilityLabel={LABELS[variant]}
          disabled={isPending}
          hitSlop={8}
          onPress={handleOpenConfirm}
          style={({ pressed }) => [
            styles.container,
            pressed || isPending ? styles.pressed : null,
          ]}
        >
          <TriangleAlertIcon color={colors.danger} size={16} strokeWidth={2} />
          <Text style={styles.label}>{LABELS[variant]}</Text>
        </Pressable>

        <DeviceLogoutConfirmModal
          isPending={isPending}
          isVisible={isVisible}
          onClose={handleClose}
          onConfirm={handleConfirm}
        />
      </>
    );
  },
);
