type AuthSessionListener = () => void;

const sessionExpiredListeners = new Set<AuthSessionListener>();

export function onAuthSessionExpired(listener: AuthSessionListener) {
  sessionExpiredListeners.add(listener);

  return () => {
    sessionExpiredListeners.delete(listener);
  };
}

export function notifyAuthSessionExpired() {
  sessionExpiredListeners.forEach(listener => {
    listener();
  });
}
