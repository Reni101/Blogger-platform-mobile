import axios from 'axios';

/**
 * true, если запрос не дошёл до сервера (нет интернета, таймаут, DNS и т.п.).
 * Ошибки с ответом от сервера (в т.ч. доменные) сюда не попадают.
 */
export function isNetworkError(error: unknown): boolean {
  return axios.isAxiosError(error) && !error.response;
}
