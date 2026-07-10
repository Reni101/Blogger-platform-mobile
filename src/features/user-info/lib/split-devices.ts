import type { DeviceType } from '../model/types/DeviceType.ts';

export function splitDevices(
  devices: DeviceType[],
  currentDeviceId: string | null,
) {
  if (!currentDeviceId) {
    return {
      mainDevice: devices[0] ?? null,
      otherDevices: devices.slice(1),
    };
  }

  const mainDeviceIndex = devices.findIndex(
    device => device.deviceId === currentDeviceId,
  );

  if (mainDeviceIndex === -1) {
    return {
      mainDevice: null,
      otherDevices: devices,
    };
  }

  return {
    mainDevice: devices[mainDeviceIndex],
    otherDevices: devices.filter((_, index) => index !== mainDeviceIndex),
  };
}
