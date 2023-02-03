import {combineReducers, configureStore} from '@reduxjs/toolkit';
import authSlice from './auth/authSlice';
import mealsSlice from './meals/mealsSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  meals: mealsSlice,
});

export const store = configureStore({reducer: rootReducer});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
