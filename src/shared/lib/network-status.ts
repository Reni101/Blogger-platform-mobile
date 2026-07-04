import NetInfo from '@react-native-community/netinfo';

// Кэшируем актуальное состояние сети, чтобы синхронно узнавать его
// в обработчиках ошибок (NetInfo.fetch — асинхронный).
let deviceOnline = true;

/**
 * Подписывается на изменения состояния сети устройства.
 * Вызывать один раз при старте приложения. Возвращает функцию отписки.
 */
export function initNetworkStatusListener(): () => void {
  return NetInfo.addEventListener(state => {
    // isInternetReachable может быть null, пока идёт проверка — тогда
    // опираемся на isConnected.
    deviceOnline = Boolean(state.isConnected && state.isInternetReachable !== false);
  });
}

/**
 * Есть ли у устройства подключение к интернету (по последнему известному состоянию).
 */
export function getIsDeviceOnline(): boolean {
  return deviceOnline;
}
