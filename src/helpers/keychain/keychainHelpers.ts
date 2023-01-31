import * as Keychain from 'react-native-keychain';

export const fetchAccessToken = async () => {
  try {
    const access_token = await Keychain.getGenericPassword();

    if (!access_token) {
      const error = new Error('Keychain could not be accessed');
      return error.message;
    }

    return access_token;
  } catch (error) {
    return (error as Error).message;
  }
};

export const setKeychainTokens = async (
  access_token: string,
  refresh_token: string,
) => {
  try {
    await Keychain.setGenericPassword(access_token, refresh_token);
  } catch (error) {
    return (error as Error).message;
  }
};

export const clearKeychain = async () => {
  try {
    await Keychain.resetGenericPassword();
  } catch (error) {
    return (error as Error).message;
  }
};
