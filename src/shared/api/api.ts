import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://musicfun.it-incubator.app/api/1.0/',
  // headers: { 'API KEY': 'ae1f8024-2cda-4690-91d0-9932de21e0be' },
});
