import { Alert } from 'react-native';
import { getIsDeviceOnline, isNetworkError } from '../../shared';

const ALERT_THROTTLE_MS = 5_000;
let lastAlertAt = 0;

function showThrottledAlert(title: string, message: string) {
  const now = Date.now();
  if (now - lastAlertAt < ALERT_THROTTLE_MS) {
    return;
  }
  lastAlertAt = now;
  Alert.alert(title, message);
}

/**
 * Глобальный обработчик ошибок TanStack Query.
 * Показывает Alert только для сетевых проблем (запрос не дошёл до сервера),
 * при этом раздельно обрабатывает два случая:
 *  - на устройстве нет интернета;
 *  - интернет есть, но сервер недоступен / не отвечает.
 *
 * На уровне axios оба случая выглядят одинаково (ERR_NETWORK), поэтому
 * различаем их по фактическому состоянию сети устройства (NetInfo).
 * Серверные (доменные) ошибки с ответом обрабатываются локально
 * в конкретных запросах/мутациях.
 */
export function handleGlobalQueryError(error: unknown) {
  if (!isNetworkError(error)) {
    return;
  }

  if (!getIsDeviceOnline()) {
    showThrottledAlert(
      'No internet connection',
      'Please check your network and try again.',
    );
    return;
  }

  showThrottledAlert(
    'Server is not responding',
    'The server is unavailable or took too long to respond. Please try again later.',
  );
}
