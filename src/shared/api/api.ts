import axios, { InternalAxiosRequestConfig } from 'axios';
import { API_URL2 } from '@env';
import { AsyncStorage } from '../lib';

export const api = axios.create({
  baseURL: API_URL2,
});

api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const accessToken = await AsyncStorage.get<string>('accessToken');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
