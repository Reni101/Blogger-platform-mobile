import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1c1f2e',
  },
  iconButton: {
    padding: 4,
  },
  iconButtonPressed: {
    opacity: 0.65,
  },
});
