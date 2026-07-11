import { useColorScheme } from 'react-native';
import {
  APP_THEME_COLORS,
  AppThemeMode,
  AsyncStorage,
  ThemeContext,
  ThemeContextValue,
} from '../../shared';
import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

function getSystemMode(
  colorScheme: ReturnType<typeof useColorScheme>,
): AppThemeMode {
  return colorScheme === 'dark' ? 'dark' : 'light';
}

const THEME_STORAGE_KEY = 'app-theme-mode';

export function ThemeProvider({ children }: PropsWithChildren) {
  const systemColorScheme = useColorScheme();
  const [storedMode, setStoredMode] = useState<AppThemeMode | null>(null);

  useEffect(() => {
    let isMounted = true;

    AsyncStorage.get<AppThemeMode>(THEME_STORAGE_KEY)
      .then(savedMode => {
        if (!isMounted) {
          return;
        }

        if (savedMode === 'dark' || savedMode === 'light') {
          setStoredMode(savedMode);
        }
      })
      .catch(() => {
        // Ignore storage read errors and fallback to system mode.
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const setThemeMode = useCallback((nextMode: AppThemeMode) => {
    setStoredMode(nextMode);

    AsyncStorage.set(THEME_STORAGE_KEY, nextMode).catch(() => {
      // Keep local state even if persistence fails.
    });
  }, []);

  const mode = storedMode ?? getSystemMode(systemColorScheme);

  const value = useMemo<ThemeContextValue>(
    () => ({
      colors: APP_THEME_COLORS[mode],
      mode,
      setThemeMode,
    }),
    [mode, setThemeMode],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
