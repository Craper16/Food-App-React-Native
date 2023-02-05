import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Settings from '../../screens/settings/Settings';
import Account from '../../screens/settings/Account';
import {Colors} from '../../constants/colors/colorsConsts';

export type SettingsStackParams = {
  Settings: undefined;
  Account: undefined;
};

const SettingsNavigatorStack = createStackNavigator<SettingsStackParams>();

export const SettingsScreenStack = () => {
  return (
    <SettingsNavigatorStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerTintColor: Colors.secondary,
      }}>
      <SettingsNavigatorStack.Screen name="Settings" component={Settings} />
      <SettingsNavigatorStack.Screen name="Account" component={Account} />
    </SettingsNavigatorStack.Navigator>
  );
};
