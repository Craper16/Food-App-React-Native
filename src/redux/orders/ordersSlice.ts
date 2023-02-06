import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {MealData} from '../../interfaces/meals/mealsInterfaces';
import {UpgradeModel} from '../../interfaces/upgrades/upgradesInterfaces';

interface OrdersModel {
  meals: MealData[];
  orderUpgrades: UpgradeModel[];
  total: number;
}

const initialState: OrdersModel = {
  meals: [],
  orderUpgrades: [],
  total: 0,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    defaultOrders: state => {
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
  },
});

export const {defaultOrders, removeMeal, addMeal, addUpgrade, removeUpgrade} =
  ordersSlice.actions;

export default ordersSlice.reducer;
