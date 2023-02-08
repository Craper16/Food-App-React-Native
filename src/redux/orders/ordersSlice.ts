import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {MealData} from '../../interfaces/meals/mealsInterfaces';
import {OrderResponse} from '../../interfaces/orders/ordersInterfaces';
import {UpgradeModel} from '../../interfaces/upgrades/upgradesInterfaces';

interface OrdersModel {
  userOrders: OrderResponse[];
  meals: MealData[];
  orderUpgrades: UpgradeModel[];
  total: number;
}

const initialState: OrdersModel = {
  userOrders: [],
  meals: [],
  orderUpgrades: [],
  total: 0,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    defaultOrders: state => {
      state.userOrders = initialState.userOrders;
      state.meals = initialState.meals;
      state.orderUpgrades = initialState.orderUpgrades;
      state.total = initialState.total;
    },
    addMeal: (state, action: PayloadAction<MealData>) => {
      state.meals = [action.payload, ...state.meals];
      state.total = state.total + action.payload.price;
    },
    removeMeal: (state, action: PayloadAction<{mealIndex: number}>) => {
      const mealToDelete = state.meals.find(
        (meal, i) => i === action.payload.mealIndex,
      );

      state.meals = [
        ...state.meals.filter((meal, i) => i !== action.payload.mealIndex),
      ];
      state.total = state.total - mealToDelete!.price;
    },
    addUpgrade: (state, action: PayloadAction<UpgradeModel>) => {
      state.orderUpgrades = [action.payload, ...state.orderUpgrades];
      state.total = state.total + action.payload.price;
    },
    removeUpgrade: (state, action: PayloadAction<{upgradeIndex: number}>) => {
      const upgradeToDelete = state.orderUpgrades.find(
        (upgrade, i) => i === action.payload.upgradeIndex,
      );

      state.orderUpgrades = [
        ...state.orderUpgrades.filter(
          (upgrade, i) => i !== action.payload.upgradeIndex,
        ),
      ];
      state.total = state.total - upgradeToDelete!.price;
    },
    setUserOrders: (state, action: PayloadAction<OrderResponse[]>) => {
      state.userOrders = [...action.payload];
    },
    resetUserOrders: state => {
      state.userOrders = initialState.userOrders;
    },
    removeUserOrder: (state, action: PayloadAction<{orderId: string}>) => {
      state.userOrders = state.userOrders.filter(
        order => order._id !== action.payload.orderId,
      );
    },
  },
});

export const {
  defaultOrders,
  removeMeal,
  addMeal,
  addUpgrade,
  removeUpgrade,
  setUserOrders,
  resetUserOrders,
  removeUserOrder,
} = ordersSlice.actions;

export default ordersSlice.reducer;
