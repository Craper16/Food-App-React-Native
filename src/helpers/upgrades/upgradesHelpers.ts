import {UserCredentials} from 'react-native-keychain';
import {UpgradeModel} from '../../interfaces/upgrades/upgradesInterfaces';
import {instance} from '../base';
import {fetchAccessToken} from '../keychain/keychainHelpers';

export const fetchUpgrades = async () => {
  const access_token = await fetchAccessToken();

  const response = await instance.get('/upgrades', {
    headers: {
      Authorization: `Bearer ${(access_token as UserCredentials).username}`,
    },
  });

  const data: UpgradeModel[] = response.data.upgrades;
  return data;
};
