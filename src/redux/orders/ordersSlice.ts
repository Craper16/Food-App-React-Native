import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {MealData} from '../../interfaces/meals/mealsInterfaces';

interface OrdersModel {
  meals: MealData[];
  total: number;
}

const initialState: OrdersModel = {
  meals: [],
  total: 0,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    defaultOrders: state => {
      state.meals = initialState.meals;
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
  },
});

export const {defaultOrders, removeMeal, addMeal} = ordersSlice.actions;

export default ordersSlice.reducer;
