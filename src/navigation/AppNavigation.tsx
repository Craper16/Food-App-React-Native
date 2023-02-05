import React, {useEffect, useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';

import {useAppSelector} from '../redux/hooks';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthScreenStack} from './auth/AuthNavigation';
import {BottomRootStack} from './bottomRootStack/BottomNavigator';
import {Badge, Icon} from '@rneui/themed';
import {ScrollView, View} from 'react-native';
import OrderOverlay from '../components/orders/OrderOverlay';
import {useMutation} from '@tanstack/react-query';
import {addOrder} from '../helpers/orders/ordersHelpers';
import {ErrorResponse} from '../interfaces/auth/authInterfaces';

export type RootStackParams = {
  AuthStack: undefined;
  BottomRootStack: undefined;
};

const RootStack = createStackNavigator<RootStackParams>();

const AppNavigation = () => {
  const [openOverlay, setOpenOverlay] = useState(false);
  const [comments, setComments] = useState('');

  const isAuth = useAppSelector(state => !!state.auth.access_token);
  const {meals, total} = useAppSelector(state => state.orders);

  console.log(meals);

  const {data, error, isError, isLoading, mutate} = useMutation({
    mutationFn: addOrder,
  });

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
            options={{
              headerShown: true,
              headerTitle: 'Saad Eats',
              headerRight: () => (
                <View>
                  <Icon
                    type="material-community"
                    name="cart"
                    style={{margin: 12}}
                    onPress={() => setOpenOverlay(true)}
                  />
                  <Badge
                    status="success"
                    value={meals.length}
                    containerStyle={{position: 'absolute', top: -6, right: 5}}
                  />
                  <ScrollView>
                    <OrderOverlay
                      total={total}
                      meals={meals}
                      buttonLoading={isLoading}
                      isVisible={openOverlay}
                      toggleOverlay={() =>
                        setOpenOverlay(prevOpenOverlay => !prevOpenOverlay)
                      }
                      comments={comments}
                      onCommentTextChange={text => setComments(text)}
                      onOrderNow={() => mutate({meals, upgrades: [], comments})}
                      errorMessage={
                        (error as ErrorResponse)?.response?.data?.message ||
                        (error as Error)?.message ||
                        null
                      }
                      isError={isError}
                    />
                  </ScrollView>
                </View>
              ),
            }}
            name="BottomRootStack"
            component={BottomRootStack}
          />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
