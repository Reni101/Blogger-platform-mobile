import {
  ConfirmationBodyType,
  EmailResendingBodyType,
  LoginBodyType,
  LoginRes,
  NewPasswordBodyType,
  PasswordRecoveryBodyType,
  RegistrationBodyType,
} from './auth-types.ts';
import { api } from '../../../shared/api';
import { getDeviceName } from '../../../shared';

export class AuthApi {
  static async login(body: LoginBodyType) {
    const name = getDeviceName();
    return api.post<LoginRes>('/auth/login', body, {
      headers: { 'x-device-name': name },
    });
  }
  static async logOut(refreshToken: string) {
    return api.post(
      '/auth/logout',
      {},
      { headers: { 'x-mobile-refresh-token': refreshToken } },
    );
  }

  static async registration(body: RegistrationBodyType) {
    return api.post('/auth/registration', body);
  }
  static async passwordRecovery(body: PasswordRecoveryBodyType) {
    return api.post('/auth/password-recovery', body);
  }
  static async newPassword(body: NewPasswordBodyType) {
    return api.post('/auth/new-password', body);
  }
  static async registrationEmailResending(body: EmailResendingBodyType) {
    return api.post('/auth/registration-email-resending', body);
  }
  static async registrationConfirmation(body: ConfirmationBodyType) {
    return api.post('/auth/registration-confirmation', body);
  }
}
