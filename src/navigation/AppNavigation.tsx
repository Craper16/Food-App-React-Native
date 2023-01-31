import React from 'react';

import {NavigationContainer} from '@react-navigation/native';

import {useAppSelector} from '../redux/hooks';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthScreenStack} from './auth/AuthNavigation';
import {MenuScreenStack} from './menu/MenuNavigationStack';

export type RootStackParams = {
  AuthStack: undefined;
  MenuStack: undefined;
};

const RootStack = createStackNavigator<RootStackParams>();

const AppNavigation = () => {
  const isAuth = useAppSelector(state => !!state.auth.access_token);

  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="AuthStack">
        {!isAuth && (
          <RootStack.Screen
            name="AuthStack"
            component={AuthScreenStack}
            options={{headerShown: false}}
          />
        )}
        {isAuth && (
          <RootStack.Screen name="MenuStack" component={MenuScreenStack} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
