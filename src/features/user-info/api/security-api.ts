import { api } from '../../../shared/api';

export class SecurityApi {
  static async getDevices() {
    return api.get('/security/dervices');
  }
}
