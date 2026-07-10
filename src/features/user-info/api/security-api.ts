import { api } from '../../../shared/api';
import { DeviceType } from '../model/types/DeviceType.ts';

export class SecurityApi {
  static async getDevices(refreshToken: string) {
    return api.get<DeviceType[]>('/security/dervices', {
      headers: { 'x-mobile-refresh-token': refreshToken },
    });
  }
  static async deleteOtherDevices(refreshToken: string) {
    return api.delete('/security/dervices', {
      headers: { 'x-mobile-refresh-token': refreshToken },
    });
  }
  static async deleteDeviceById(refreshToken: string, deviceId: string) {
    return api.delete(`/security/dervices/${deviceId}`, {
      headers: { 'x-mobile-refresh-token': refreshToken },
    });
  }
}
