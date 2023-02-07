import {createStackNavigator} from '@react-navigation/stack';
import OrderDetails from '../../screens/orders/OrderDetails';
import Orders from '../../screens/orders/Orders';

export type OrdersStackParams = {
  Orders: undefined;
  OrderDetails: {orderId: string};
};

const OrdersStackNavigator = createStackNavigator<OrdersStackParams>();

export const OrdersScreenStack = () => {
  return (
    <OrdersStackNavigator.Navigator screenOptions={{headerShown: false}}>
      <OrdersStackNavigator.Screen name="Orders" component={Orders} />
      <OrdersStackNavigator.Screen
        name="OrderDetails"
        component={OrderDetails}
      />
    </OrdersStackNavigator.Navigator>
  );
};
