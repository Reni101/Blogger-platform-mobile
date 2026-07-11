import { memo, useState } from 'react';
import { Pressable, Text } from 'react-native';
import {
  TriangleAlertIcon,
  useAppTheme,
  useThemedStyles,
} from '../../../../../shared';
import { DeviceLogoutConfirmModal } from '../DeviceLogoutConfirmModal.tsx';
import { createOtherDeviceLogoutActionStyles } from './OtherDeviceLogoutAction.styles.ts';
import { useDeleteDeviceByIdMutation } from '../../../hooks/useDeleteDeviceByIdMutation.ts';

const LABEL = 'Log out from device';

type OtherDeviceLogoutActionProps = {
  deviceId: string;
};

export const OtherDeviceLogoutAction = memo(
  ({ deviceId }: OtherDeviceLogoutActionProps) => {
    const { colors } = useAppTheme();
    const styles = useThemedStyles(createOtherDeviceLogoutActionStyles);

    const [isVisible, setIsVisible] = useState(false);

    const { mutate, isPending } = useDeleteDeviceByIdMutation({
      onSuccess: () => setIsVisible(false),
    });

    return (
      <>
        <Pressable
          accessibilityLabel={LABEL}
          disabled={isPending}
          hitSlop={8}
          onPress={() => setIsVisible(true)}
          style={({ pressed }) => [
            styles.container,
            pressed || isPending ? styles.pressed : null,
          ]}
        >
          <TriangleAlertIcon color={colors.danger} size={16} strokeWidth={2} />
          <Text style={styles.label}>{LABEL}</Text>
        </Pressable>

        <DeviceLogoutConfirmModal
          isPending={isPending}
          isVisible={isVisible}
          onClose={() => {
            if (!isPending) {
              setIsVisible(false);
            }
          }}
          onConfirm={() => {
            mutate(deviceId);
          }}
        />
      </>
    );
  },
);
