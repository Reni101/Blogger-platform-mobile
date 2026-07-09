import { api } from '../../../shared/api';
import { UserType } from '../model/UserType.ts';

export class UserApi {
  static async me() {
    return api.get<UserType>('/auth/me', {});
  }
}
