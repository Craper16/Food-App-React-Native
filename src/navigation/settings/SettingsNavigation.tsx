import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Settings from '../../screens/settings/Settings';

export type SettingsStackParams = {
  Settings: undefined;
};

const SettingsNavigatorStack = createStackNavigator<SettingsStackParams>();

export const SettingsScreenStack = () => {
  return (
    <SettingsNavigatorStack.Navigator>
      <SettingsNavigatorStack.Screen name="Settings" component={Settings} />
    </SettingsNavigatorStack.Navigator>
  );
};
