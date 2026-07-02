import {
  LoginBodyType,
  LoginRes,
  MeRes,
  RegistrationBodyType,
} from './authTypes.ts';
import { api } from '../../../shared/api';

export class AuthApi {
  static async login(body: LoginBodyType) {
    return api.post<LoginRes>('/auth/login', body);
  }
  static async logOut(refreshToken: string) {
    return api.post('/auth/logout', { refreshToken });
  }
  static async me() {
    return api.get<MeRes>('/auth/me', {});
  }
  static async registration(body: RegistrationBodyType) {
    return api.post('/auth/registration', body);
  }
}
