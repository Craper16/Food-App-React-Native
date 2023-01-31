import {API_KEY} from '@env';
import axios from 'axios';

export const instance = axios.create({
  baseURL: API_KEY,
  timeout: 15000,
});
