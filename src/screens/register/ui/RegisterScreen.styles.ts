import { StyleSheet } from 'react-native';

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
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  titleAccent: {
    color: '#007aff',
    fontWeight: '800',
  },
});
