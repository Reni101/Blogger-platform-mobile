export type LoginBodyType = {
  loginOrEmail: string;
  password: string;
};

export type LoginRes = {
  accessToken: string;
  refreshToken: string;
};
export type MeRes = {
  userId: string;
  login: string;
};
export type RegistrationBodyType = {
  login: string;
  password: string;
  email: string;
};
