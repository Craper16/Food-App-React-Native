import {UserCredentials} from 'react-native-keychain';
import {
  credentials,
  SigninData,
  SignupData,
  signUpDataModel,
  updateUserModel,
  userDataModel,
} from '../../interfaces/auth/authInterfaces';
import {instance} from '../base';
import {fetchAccessToken} from '../keychain/keychainHelpers';

export const signInUser = async (
  credentials: credentials,
): Promise<SigninData> => {
  const response = await instance.post('/auth/signin', credentials);

  const data: SigninData = response.data;
  return data;
};

export const signUpUser = async (
  userData: signUpDataModel,
): Promise<SignupData> => {
  const response = await instance.post('/auth/signup', userData);

  const data: SignupData = response.data;
  return data;
};

export const getUserData = async (): Promise<userDataModel> => {
  const access_token = await fetchAccessToken();

  const response = await instance.get('/auth/me', {
    headers: {
      Authorization: `Bearer ${(access_token as UserCredentials).username}`,
    },
  });

  const data: userDataModel = response.data;
  return data;
};

export const updateUser = async (updateData: updateUserModel) => {
  const access_token = await fetchAccessToken();

  const response = await instance.put('/auth/update-user', updateData, {
    headers: {
      Authorization: `Bearer ${(access_token as UserCredentials).username}`,
    },
  });

  const data: userDataModel = response.data;
  return data;
};

export const refreshAccessToken = async ({
  refresh_token,
}: {
  refresh_token: string;
}) => {
  const response = await instance.post('/auth/refresh', {
    refreshToken: refresh_token,
  });

  const data: SigninData = response.data;
  return data;
};
