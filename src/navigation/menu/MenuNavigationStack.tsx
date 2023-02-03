import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Menu from '../../screens/menu/Menu';
import MealDetails from '../../screens/menu/MealDetails';

export type MenuStackParams = {
  Menu: undefined;
  MealDetails: {mealId: string};
};

const MenuStackNavigator = createStackNavigator<MenuStackParams>();

export const MenuScreenStack = () => {
  return (
    <MenuStackNavigator.Navigator>
      <MenuStackNavigator.Screen name="Menu" component={Menu} />
      <MenuStackNavigator.Screen name="MealDetails" component={MealDetails} />
    </MenuStackNavigator.Navigator>
  );
};
