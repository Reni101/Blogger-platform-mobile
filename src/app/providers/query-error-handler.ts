import { Alert } from 'react-native';
import { isNetworkError } from '../../shared';

const ALERT_THROTTLE_MS = 5_000;
let lastAlertAt = 0;

/**
 * Глобальный обработчик ошибок TanStack Query.
 * Показывает Alert только когда проблема на стороне сети (нет интернета и т.п.)
 * и не связана с ответом сервера — серверные (доменные) ошибки
 * обрабатываются локально в конкретных запросах/мутациях.
 */
export function handleGlobalQueryError(error: unknown) {
  if (!isNetworkError(error)) {
    return;
  }

  const now = Date.now();
  if (now - lastAlertAt < ALERT_THROTTLE_MS) {
    return;
  }
  lastAlertAt = now;

  Alert.alert(
    'No internet connection',
    'Please check your network and try again.',
  );
}
