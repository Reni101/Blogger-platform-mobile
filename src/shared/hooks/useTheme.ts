import { createContext, useContext, useMemo } from 'react';
import { type AppThemeColors, AppThemeMode } from '../consts/theme.ts';

export type ThemeContextValue = {
  colors: AppThemeColors;
  mode: AppThemeMode;
  setThemeMode: (mode: AppThemeMode) => void;
};

export const ThemeContext = createContext<ThemeContextValue | null>(null);

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
