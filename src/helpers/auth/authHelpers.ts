import {UserCredentials} from 'react-native-keychain';
import {
  credentials,
  SigninData,
  SignupData,
  signUpDataModel,
  userDataModel,
} from '../../interfaces/auth/authInterfaces';
import {instance} from '../base';
import {fetchAccessToken} from '../keychain/keychainHelpers';

export const signInUser = async (
  credentials: credentials,
): Promise<SigninData> => {
  const response = await instance.post('/auth/signin', credentials);
  return response.data;
};

export const signUpUser = async (
  userData: signUpDataModel,
): Promise<SignupData> => {
  const response = await instance.post('/auth/signup', userData);
  return response.data;
};

export const getUserData = async (): Promise<userDataModel | string> => {
  const access_token = await fetchAccessToken();

  if (!access_token) {
    const error = new Error('Keychain could not be accessed');
    return error.message;
  }

  const response = await instance.get('/auth/me', {
    headers: {
      Authorization: `Bearer ${(access_token as UserCredentials).username}`,
    },
  });
  return response.data;
};
