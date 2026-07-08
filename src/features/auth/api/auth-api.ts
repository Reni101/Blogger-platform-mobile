import {
  ConfirmationBodyType,
  EmailResendingBodyType,
  LoginBodyType,
  LoginRes,
  NewPasswordBodyType,
  PasswordRecoveryBodyType,
  RegistrationBodyType,
} from './authTypes.ts';
import { api } from '../../../shared/api';
import { UserType } from '../../../entities/User';

export class AuthApi {
  static async login(body: LoginBodyType) {
    return api.post<LoginRes>('/auth/login', body);
  }
  static async logOut(refreshToken: string) {
    return api.post('/auth/logout', { refreshToken });
  }
  static async me() {
    return api.get<UserType>('/auth/me', {});
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
    return api.post('/auth/registration-email-resenditn', body);
  }
  static async registrationConfirmation(body: ConfirmationBodyType) {
    return api.post('/auth/registration-confirmation', body);
  }
}
