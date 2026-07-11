import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { SecureStorage } from '../../shared';

type InitContextType = {
  isLoading: boolean;
  initialRouteName: 'mainTabs' | 'login';
};
const InitContext = createContext<InitContextType | null>(null);

export const InitProvider = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasAccessToken, setHasAccessToken] = useState(false);

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const accessToken = await SecureStorage.get<string>('accessToken');
        const refreshToken = await SecureStorage.get<string>('refreshToken');

        if (accessToken && refreshToken) {
          setHasAccessToken(true);
        }
      } finally {
        setIsLoading(false);
      }
    };

    bootstrapAsync();
  }, []);

  return (
    <InitContext.Provider
      value={{
        isLoading,
        initialRouteName: hasAccessToken ? 'mainTabs' : 'login',
      }}
    >
      {children}
    </InitContext.Provider>
  );
};

export function useInit() {
  const context = useContext(InitContext);

  if (!context) {
    throw new Error('useInit must be used within ThemeProvider');
  }

  return context;
}
