import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { Platform } from 'react-native';
import { API_URL2 } from '@env';
import {
  AsyncStorage,
  notifyAuthSessionExpired,
  SecureStorage,
} from '../lib';

type RefreshTokenResponse = {
  accessToken: string;
  refreshToken: string;
};

type RetryableAxiosRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

const ANDROID_EMULATOR_HOST = '10.0.2.2';

function resolveApiBaseUrl(rawBaseUrl: string) {
  const trimmedBaseUrl = rawBaseUrl.trim();

  if (!trimmedBaseUrl) {
    throw new Error('API_URL2 is empty');
  }

  if (Platform.OS !== 'android') {
    return trimmedBaseUrl;
  }

  // Android emulator cannot access host machine by localhost/127.0.0.1.
  return trimmedBaseUrl
    .replace('://localhost', `://${ANDROID_EMULATOR_HOST}`)
    .replace('://127.0.0.1', `://${ANDROID_EMULATOR_HOST}`);
}

/** Запросы, при 401 на которых refresh не выполняется. */
const AUTH_REFRESH_SKIP_PATHS: string[] = ['/auth/login'];

const API_BASE_URL = resolveApiBaseUrl(API_URL2);

function shouldSkipAuthRefresh(url?: string) {
  if (!url) {
    return false;
  }

  return AUTH_REFRESH_SKIP_PATHS.some(path => url.includes(path));
}

export const api = axios.create({
  baseURL: API_BASE_URL,
  // Без таймаута зависший сервер не порождает ошибку — ставим предел,
  // после которого axios бросит ECONNABORTED (сервер не отвечает).
  timeout: 15_000,
});

api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const accessToken = await AsyncStorage.get<string>('accessToken');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

function processQueue(error: unknown, token: string | null = null) {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else if (token) {
      resolve(token);
    }
  });
  failedQueue = [];
}

async function refreshAccessToken() {
  const refreshToken = await SecureStorage.get<string>('refreshToken');
  if (!refreshToken) {
    throw new Error('Refresh token is missing');
  }

  const { data } = await axios.post<RefreshTokenResponse>(
    `${API_BASE_URL}auth/refresh-token`,
    { refreshToken },
    { timeout: 15_000 },
  );

  await AsyncStorage.set('accessToken', data.accessToken);
  await SecureStorage.set('refreshToken', data.refreshToken);

  return data.accessToken;
}

async function clearAuthTokens() {
  await AsyncStorage.remove('accessToken');
  await SecureStorage.remove('refreshToken');
  notifyAuthSessionExpired();
}

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryableAxiosRequestConfig | undefined;

    if (
      !originalRequest ||
      error.response?.status !== 401 ||
      originalRequest._retry ||
      shouldSkipAuthRefresh(originalRequest.url)
    ) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then(token => {
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const newAccessToken = await refreshAccessToken();
      processQueue(null, newAccessToken);
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return api(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      await clearAuthTokens();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);
