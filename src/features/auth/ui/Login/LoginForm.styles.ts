import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    gap: 8,
    width: '100%',
  },
  inputRow: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor: '#d8dae0',
    borderCurve: 'continuous',
    borderRadius: 32,
    borderWidth: 1.5,
    boxShadow: '0 4px 12px rgba(28, 31, 46, 0.08)',
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 22,
    paddingVertical: 16,
  },
  input: {
    color: '#1c1f2e',
    flex: 1,
    fontSize: 16,
    padding: 0,
  },
  errorSlot: {
    justifyContent: 'center',
    minHeight: 20,
    paddingTop: 4,
  },
  errorText: {
    color: '#e5484d',
    fontSize: 13,
    paddingHorizontal: 22,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    color: '#1c1f2e',
    fontSize: 15,
    fontWeight: '600',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#1c1f2e',
    borderCurve: 'continuous',
    borderRadius: 32,
    justifyContent: 'center',
    marginTop: 8,
    paddingVertical: 18,
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 1,
  },
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'center',
    marginTop: 8,
  },
  footerText: {
    color: '#9a9da6',
    fontSize: 15,
  },
  footerLink: {
    color: '#1c1f2e',
    fontSize: 15,
    fontWeight: '600',
  },
});
