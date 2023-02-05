import {MealData} from '../meals/mealsInterfaces';

export interface OrderData {
  meals: MealData[];
  upgrades: [];
  comments: string;
}

export interface OrderSuccessful {
  message: string;
  order: {
    meals: MealData[];
    upgrades: any;
    amountToPay: number;
    comments: string;
    client: string;
    isDelivered: boolean;
  };
}
