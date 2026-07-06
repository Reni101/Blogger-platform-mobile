export type AppThemeMode = 'light' | 'dark';

export type AppThemeColors = {
  screenBackground: string;
  cardBackground: string;
  cardBorder: string;
  separator: string;
  inputBackground: string;
  inputBorder: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  textOnAccent: string;
  iconPrimary: string;
  iconOnAccent: string;
  accent: string;
  accentContrast: string;
  danger: string;
  success: string;
  shadowSoft: string;
  shadowStrong: string;
  switchTrackOff: string;
  switchTrackOn: string;
  switchThumb: string;
  tabBarBackground: string;
  tabBarActive: string;
  tabBarInactive: string;
};

type ThemePalette = Record<AppThemeMode, AppThemeColors>;

export const APP_THEME_COLORS: ThemePalette = {
  light: {
    screenBackground: '#f5f7fb',
    cardBackground: '#ffffff',
    cardBorder: '#e2e6ef',
    separator: '#eef1f7',
    inputBackground: '#ffffff',
    inputBorder: '#d8dae0',
    textPrimary: '#1c1f2e',
    textSecondary: '#5d6375',
    textMuted: '#9a9da6',
    textOnAccent: '#ffffff',
    iconPrimary: '#1c1f2e',
    iconOnAccent: '#ffffff',
    accent: '#1c1f2e',
    accentContrast: '#007aff',
    danger: '#cb3a31',
    success: '#1f7a36',
    shadowSoft: '0 4px 12px rgba(28, 31, 46, 0.08)',
    shadowStrong: '0 10px 22px rgba(28, 31, 46, 0.28)',
    switchTrackOff: '#c9d1df',
    switchTrackOn: '#007aff',
    switchThumb: '#ffffff',
    tabBarBackground: '#ffffff',
    tabBarActive: '#1c1f2e',
    tabBarInactive: '#667085',
  },
  dark: {
    screenBackground: '#0f1118',
    cardBackground: '#1a1f2b',
    cardBorder: '#2a3142',
    separator: '#2a3142',
    inputBackground: '#1a1f2b',
    inputBorder: '#2f3749',
    textPrimary: '#f4f7ff',
    textSecondary: '#c2c8d8',
    textMuted: '#8f98ac',
    textOnAccent: '#f4f7ff',
    iconPrimary: '#f4f7ff',
    iconOnAccent: '#f4f7ff',
    accent: '#2e3447',
    accentContrast: '#60a5fa',
    danger: '#ff7b72',
    success: '#5ed889',
    shadowSoft: '0 4px 12px rgba(0, 0, 0, 0.35)',
    shadowStrong: '0 10px 22px rgba(0, 0, 0, 0.5)',
    switchTrackOff: '#3b4357',
    switchTrackOn: '#60a5fa',
    switchThumb: '#f4f7ff',
    tabBarBackground: '#1a1f2b',
    tabBarActive: '#f4f7ff',
    tabBarInactive: '#8f98ac',
  },
};
