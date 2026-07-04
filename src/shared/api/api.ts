import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
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

/** Запросы, при 401 на которых refresh не выполняется. */
const AUTH_REFRESH_SKIP_PATHS: string[] = ['/auth/login'];


function shouldSkipAuthRefresh(url?: string) {
  if (!url) {
    return false;
  }

  return AUTH_REFRESH_SKIP_PATHS.some(path => url.includes(path));
}

export const api = axios.create({
  baseURL: API_URL2,
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
    `${API_URL2}auth/refresh-token`,
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
