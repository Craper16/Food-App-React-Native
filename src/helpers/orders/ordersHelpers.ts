import {UserCredentials} from 'react-native-keychain';
import {
  OrderData,
  OrderSuccessful,
} from '../../interfaces/orders/ordersInterfaces';
import {instance} from '../base';
import {fetchAccessToken} from '../keychain/keychainHelpers';

export const addOrder = async (orderDetails: OrderData) => {
  const access_token = await fetchAccessToken();

  const response = await instance.post('/orders/add-order', orderDetails, {
    headers: {
      Authorization: `Bearer ${(access_token as UserCredentials).username}`,
    },
  });

  const data: OrderSuccessful = response.data;

  return data;
};
