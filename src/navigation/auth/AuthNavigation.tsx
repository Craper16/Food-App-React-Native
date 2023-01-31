import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Signin from '../../screens/auth/Signin';
import Signup from '../../screens/auth/Signup';

export type AuthStackParams = {
  Signin: undefined;
  Signup: undefined;
};

const AuthNavigatorStack = createStackNavigator<AuthStackParams>();

export const AuthScreenStack = () => {
  return (
    <AuthNavigatorStack.Navigator
      initialRouteName="Signin"
      screenOptions={{headerShown: false}}>
      <AuthNavigatorStack.Screen name="Signin" component={Signin} />
      <AuthNavigatorStack.Screen name="Signup" component={Signup} />
    </AuthNavigatorStack.Navigator>
  );
};
