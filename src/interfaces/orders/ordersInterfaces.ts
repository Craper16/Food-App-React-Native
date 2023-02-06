import {OrderMethod} from '../../navigation/AppNavigation';
import {MealData} from '../meals/mealsInterfaces';
import { UpgradeModel } from '../upgrades/upgradesInterfaces';

export interface OrderData {
  meals: MealData[];
  upgrades: UpgradeModel[];
  comments: string;
  method: OrderMethod;
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
