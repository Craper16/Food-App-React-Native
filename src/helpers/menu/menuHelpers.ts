import {UserCredentials} from 'react-native-keychain';
import {MealData} from '../../interfaces/meals/mealsInterfaces';
import {instance} from '../base';
import {fetchAccessToken} from '../keychain/keychainHelpers';

export const fetchMeals = async (): Promise<MealData[]> => {
  const access_token = await fetchAccessToken();
  const response = await instance.get('/meals', {
    headers: {
      Authorization: `Bearer ${(access_token as UserCredentials).username}`,
    },
  });

  const data: MealData[] = response.data.meals;

  return data;
};

export const fetchMeal = async (mealId: string): Promise<MealData> => {
  const access_token = await fetchAccessToken();

  const response = await instance.get(`/meals/${mealId}`, {
    headers: {
      Authorization: `Bearer ${(access_token as UserCredentials).username}`,
    },
  });

  const data: MealData = response.data.meal;
  return data;
};
