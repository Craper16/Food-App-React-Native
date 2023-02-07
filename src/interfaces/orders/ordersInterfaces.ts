import {OrderMethod} from '../../navigation/AppNavigation';
import {MealData} from '../meals/mealsInterfaces';
import {UpgradeModel} from '../upgrades/upgradesInterfaces';

export interface OrderData {
  meals: MealData[];
  upgrades: UpgradeModel[];
  comments: string;
  method: OrderMethod;
}

export interface OrderResponse extends OrderData {
  createdAt: Date;
  updatedAt: Date;
  amountToPay: number;
  client: string;
  isDelivered: boolean;
  _id: string;
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
