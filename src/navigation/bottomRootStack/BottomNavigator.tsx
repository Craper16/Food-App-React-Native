import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon, Text} from '@rneui/base';
import {Colors} from '../../constants/colors/colorsConsts';
import {CategoriesScreenStack} from '../categories/CategoriesNavigation';
import {MenuScreenStack} from '../menu/MenuNavigationStack';
import {OrdersScreenStack} from '../orders/OrdersNavigation';
import {SettingsScreenStack} from '../settings/SettingsNavigation';

export type BottomRootStackNavigatorParams = {
  MenuStack: undefined;
  CategoriesStack: undefined;
  OrdersStack: undefined;
  SettingsStack: undefined;
};

const BottomStackNavigator =
  createBottomTabNavigator<BottomRootStackNavigatorParams>();

export const BottomRootStack = () => {
  return (
    <BottomStackNavigator.Navigator
      initialRouteName="MenuStack"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({color, focused, size}) => {
          let iconName: string = '';

          switch (route.name) {
            case 'MenuStack':
              iconName = focused ? 'restaurant-menu' : 'restaurant-menu';
              break;
            case 'CategoriesStack':
              iconName = focused ? 'category' : 'category';
              break;
            case 'OrdersStack':
              iconName = focused ? 'assignment' : 'assignment';
              break;
            case 'SettingsStack':
              iconName = focused ? 'settings' : 'settings';
              break;
          }
          return (
            <Icon name={iconName} type="material" color={color} size={size} />
          );
        },
        tabBarLabel: ({children, color}) => {
          switch (route.name) {
            case 'MenuStack':
              children = 'Menu';
              break;
            case 'CategoriesStack':
              children = 'Categories';
              break;
            case 'OrdersStack':
              children = 'Orders';
              break;
            case 'SettingsStack':
              children = 'Settings';
              break;
            default:
              children = '';
          }
          return <Text style={{color: color, fontSize: 11}}>{children}</Text>;
        },
        tabBarActiveTintColor: Colors.secondary,
        tabBarActiveBackgroundColor: Colors.primary,
        tabBarInactiveBackgroundColor: Colors.primary,
      })}>
      <BottomStackNavigator.Screen
        name="MenuStack"
        component={MenuScreenStack}
      />
      <BottomStackNavigator.Screen
        name="CategoriesStack"
        component={CategoriesScreenStack}
      />
      <BottomStackNavigator.Screen
        name="OrdersStack"
        component={OrdersScreenStack}
      />
      <BottomStackNavigator.Screen
        name="SettingsStack"
        component={SettingsScreenStack}
      />
    </BottomStackNavigator.Navigator>
  );
};
