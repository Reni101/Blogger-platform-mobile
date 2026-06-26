import { LoginBodyType } from './authTypes.ts';
import { api } from '../../../shared/api';

export class AuthApi {
  static async login(body: LoginBodyType) {
    return api.post('/auth/simple/login', body);
  }
}
