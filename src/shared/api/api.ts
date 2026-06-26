import axios from 'axios';
import { API_URL } from '@env';

export const api = axios.create({
  baseURL: API_URL,
  // headers: { 'API KEY': 'ae1f8024-2cda-4690-91d0-9932de21e0be' },
});
