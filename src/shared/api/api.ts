import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { Alert, Platform } from 'react-native';
import { API_URL, API_URL_LOCAL } from '@env';
import { SecureStorage } from '../lib';
import { useAuthStore } from '../../features/auth';

const ANDROID_EMULATOR_HOST = '10.0.2.2';

function resolveApiBaseUrl(rawBaseUrl: string) {
  const trimmedBaseUrl = rawBaseUrl.trim();

  if (!trimmedBaseUrl) {
    throw new Error('API base URL is empty');
  }

  if (Platform.OS !== 'android') {
    return trimmedBaseUrl;
  }

  // Android emulator cannot access host machine by localhost/127.0.0.1.
  return trimmedBaseUrl
    .replace('://localhost', `://${ANDROID_EMULATOR_HOST}`)
    .replace('://127.0.0.1', `://${ANDROID_EMULATOR_HOST}`);
}

/** Запросы, при 401 на которых logout не выполняется. */
const AUTH_LOGOUT_SKIP_PATHS: string[] = ['/auth/login'];

const API_BASE_URL = resolveApiBaseUrl(__DEV__ ? API_URL_LOCAL : API_URL);

function shouldSkipAuthLogout(url?: string) {
  if (!url) {
    return false;
  }

  return AUTH_LOGOUT_SKIP_PATHS.some(path => url.includes(path));
}

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15_000,
});

api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const accessToken = await SecureStorage.get<string>('accessToken');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    if (
      error.response?.status === 401 &&
      !shouldSkipAuthLogout(error.config?.url)
    ) {
      await useAuthStore.getState().logout();
      Alert.alert(
        'Session expired',
        'Your session has ended. Please sign in again.',
      );
    }

    return Promise.reject(error);
  },
);
