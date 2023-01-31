import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Categories from '../../screens/categories/Categories';

export type CategoriesStackParams = {
  Categories: undefined;
};

const CategoriesNavigatorStack = createStackNavigator<CategoriesStackParams>();

export const CategoriesScreenStack = () => {
  return (
    <CategoriesNavigatorStack.Navigator initialRouteName="Categories">
      <CategoriesNavigatorStack.Screen
        name="Categories"
        component={Categories}
      />
    </CategoriesNavigatorStack.Navigator>
  );
};
