import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Menu from '../../screens/menu/Menu';

export type MenuStackParams = {
  Menu: undefined;
};

const MenuStackNavigator = createStackNavigator<MenuStackParams>();

export const MenuScreenStack = () => {
  return (
    <MenuStackNavigator.Navigator>
      <MenuStackNavigator.Screen name="Menu" component={Menu} />
    </MenuStackNavigator.Navigator>
  );
};
