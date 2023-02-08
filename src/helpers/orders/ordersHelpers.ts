import {UserCredentials} from 'react-native-keychain';
import {
  OrderData,
  OrderResponse,
  OrderSuccessful,
} from '../../interfaces/orders/ordersInterfaces';
import {instance} from '../base';
import {fetchAccessToken} from '../keychain/keychainHelpers';

export const getUserOrders = async () => {
  const access_token = await fetchAccessToken();

  const response = await instance.get('/orders', {
    headers: {
      Authorization: `Bearer ${(access_token as UserCredentials).username}`,
    },
  });

  const data: OrderResponse[] = response.data.orders;
  return data;
};

export const getUserOrder = async (orderId: string) => {
  const access_token = await fetchAccessToken();

  const response = await instance.get(`/orders/${orderId}`, {
    headers: {
      Authorization: `Bearer ${(access_token as UserCredentials).username}`,
    },
  });

  const data: OrderResponse = response.data.order;
  return data;
};

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

export const deleteOrder = async (orderId: string) => {
  const access_token = await fetchAccessToken();

  const response = await instance.delete(`/orders/${orderId}`, {
    headers: {
      Authorization: `Bearer ${(access_token as UserCredentials).username}`,
    },
  });

  const data = response.data;

  return data;
};
