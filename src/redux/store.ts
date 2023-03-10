import {combineReducers, configureStore} from '@reduxjs/toolkit';
import authSlice from './auth/authSlice';
import mealsSlice from './meals/mealsSlice';
import ordersSlice from './orders/ordersSlice';
import upgradesSlice from './upgrades/upgradesSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  meals: mealsSlice,
  orders: ordersSlice,
  upgrades: upgradesSlice,
});

export const store = configureStore({reducer: rootReducer});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
