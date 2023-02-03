import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {MealData} from '../../interfaces/meals/mealsInterfaces';

interface MealsModel {
  meals: MealData[];
  filteredMeals: MealData[];
}

const initialState: MealsModel = {
  meals: [],
  filteredMeals: [],
};

const mealsSlice = createSlice({
  name: 'meals',
  initialState,
  reducers: {
    defaultMeals: state => {
      state.meals = initialState.meals;
      state.filteredMeals = initialState.filteredMeals;
    },
    setMeals: (state, action: PayloadAction<MealData[]>) => {
      state.meals = [...action.payload];
    },
    filterMeals: (state, action: PayloadAction<string>) => {
      state.filteredMeals = [
        ...state.meals.filter(
          meal =>
            meal.title.toLowerCase().includes(action.payload.toLowerCase()) ||
            meal.description
              .toLowerCase()
              .includes(action.payload.toLowerCase()),
        ),
      ];
    },
  },
});

export const {defaultMeals, setMeals, filterMeals} = mealsSlice.actions;

export default mealsSlice.reducer;
