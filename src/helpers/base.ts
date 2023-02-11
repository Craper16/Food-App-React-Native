import {API_KEY} from '@env';
import axios from 'axios';
import dayjs from 'dayjs';
import jwtDecode from 'jwt-decode';
import {UserCredentials} from 'react-native-keychain';
import {SigninData} from '../interfaces/auth/authInterfaces';
import {setUser, setUserTokens} from '../redux/auth/authSlice';
import {store} from '../redux/store';
import {fetchAccessToken, setKeychainTokens} from './keychain/keychainHelpers';

export const instance = axios.create({
  baseURL: API_KEY,
  timeout: 15000,
});

instance.interceptors.request.use(async req => {
  const {dispatch} = store;

  const tokens = await fetchAccessToken();

  const user: {exp: number} = jwtDecode((tokens as UserCredentials).username);
  const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

  if (!isExpired) return req;

  const response = await axios.post(`${API_KEY}/auth/refresh`, {
    refreshToken: (tokens as UserCredentials).password,
  });

  const data: SigninData = response.data;

  await setKeychainTokens(data?.access_token!, data?.refresh_token!);

  dispatch(
    setUserTokens({
      access_token: data?.access_token!,
      refresh_token: data?.refresh_token!,
    }),
  );
  dispatch(
    setUser({
      firstName: data?.firstName!,
      lastName: data?.lastName!,
      address: data?.address!,
      email: data?.email!,
      phoneNumber: data?.phoneNumber!,
    }),
  );

  req.headers.Authorization = `Bearer ${data?.access_token!}`;
  return req;
});
