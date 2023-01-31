import React from 'react';

import {NavigationContainer} from '@react-navigation/native';

import {useAppSelector} from '../redux/hooks';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthScreenStack} from './auth/AuthNavigation';
import {MenuScreenStack} from './menu/MenuNavigationStack';
import {BottomRootStack} from './bottomRootStack/BottomNavigator';

export type RootStackParams = {
  AuthStack: undefined;
  BottomRootStack: undefined;
};

const RootStack = createStackNavigator<RootStackParams>();

const AppNavigation = () => {
  const isAuth = useAppSelector(state => !!state.auth.access_token);

  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="AuthStack"
        screenOptions={{headerShown: false}}>
        {!isAuth && (
          <RootStack.Screen
            name="AuthStack"
            component={AuthScreenStack}
            options={{headerShown: false}}
          />
        )}
        {isAuth && (
          <RootStack.Screen
            name="BottomRootStack"
            component={BottomRootStack}
          />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
