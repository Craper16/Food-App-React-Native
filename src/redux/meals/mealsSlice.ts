import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {MealData} from '../../interfaces/meals/mealsInterfaces';

interface MealsModel {
  meals: MealData[];
}

const initialState: MealsModel = {
  meals: [],
};

const mealsSlice = createSlice({
  name: 'meals',
  initialState,
  reducers: {
    defaultMeals: state => {
      state.meals = initialState.meals;
    },
    setMeals: (state, action: PayloadAction<MealData[]>) => {
      state.meals = [...action.payload];
    },
  },
});

export const {defaultMeals, setMeals} = mealsSlice.actions;

export default mealsSlice.reducer;
