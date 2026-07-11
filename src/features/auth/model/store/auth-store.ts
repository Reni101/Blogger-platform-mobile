import { create } from 'zustand';
import { SecureStorage } from '../../../../shared';
import { immer } from 'zustand/middleware/immer';

interface AuthState {
  isAuthorized: boolean;
  isLoading: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  login: (accessToken: string, refreshToken: string) => Promise<void>;
  logout: () => Promise<void>;
  setLoading: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  immer(set => ({
    isAuthorized: false,
    isLoading: true,
    accessToken: null,
    refreshToken: null,
    login: async (accessToken, refreshToken) => {
      await SecureStorage.set('accessToken', accessToken);
      await SecureStorage.set('refreshToken', refreshToken);

      set(state => {
        state.isAuthorized = true;
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
      });
    },
    logout: async () => {
      await SecureStorage.remove('accessToken');
      await SecureStorage.remove('refreshToken');
      set(state => {
        state.isAuthorized = false;
        state.accessToken = null;
        state.refreshToken = null;
      });
    },
    setLoading: (value: boolean) => {
      set(state => {
        state.isLoading = value;
      });
    },
  })),
);
