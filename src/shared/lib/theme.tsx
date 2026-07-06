import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react';
import { useColorScheme } from 'react-native';
import {
  APP_THEME_COLORS,
  type AppThemeColors,
  type AppThemeMode,
} from '../consts/theme.ts';
import { AsyncStorage } from './async-storage.ts';

const THEME_STORAGE_KEY = 'app-theme-mode';

type ThemeContextValue = {
  colors: AppThemeColors;
  mode: AppThemeMode;
  setThemeMode: (mode: AppThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getSystemMode(
  colorScheme: ReturnType<typeof useColorScheme>,
): AppThemeMode {
  return colorScheme === 'dark' ? 'dark' : 'light';
}

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

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useAppTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useAppTheme must be used within ThemeProvider');
  }

  return context;
}

export function useThemedStyles<Styles>(
  createStyles: (colors: AppThemeColors) => Styles,
) {
  const { colors } = useAppTheme();

  return useMemo(() => createStyles(colors), [colors, createStyles]);
}
