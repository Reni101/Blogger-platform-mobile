import { Platform, StyleSheet } from 'react-native';

const displayFont = Platform.select({
  ios: 'Avenir Next',
  android: 'sans-serif-medium',
  default: undefined,
});

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    gap: 14,
    marginBottom: 44,
  },
  iconBadge: {
    alignItems: 'center',
    backgroundColor: '#1c1f2e',
    borderCurve: 'continuous',
    borderRadius: 22,
    boxShadow: '0 10px 22px rgba(28, 31, 46, 0.28)',
    height: 68,
    justifyContent: 'center',
    width: 68,
  },
  title: {
    color: '#1c1f2e',
    fontFamily: displayFont,
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  titleAccent: {
    color: '#007aff',
    fontFamily: displayFont,
    fontWeight: '800',
  },
  subtitle: {
    color: '#9a9da6',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 2.5,
  },
  button: {
    backgroundColor: '#2563eb',
    borderRadius: 12,
    borderCurve: 'continuous',
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
