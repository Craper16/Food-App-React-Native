import React, {useEffect, useState} from 'react';

import Toast from 'react-native-toast-message';

import {NavigationContainer} from '@react-navigation/native';

import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthScreenStack} from './auth/AuthNavigation';
import {BottomRootStack} from './bottomRootStack/BottomNavigator';
import {Badge, Icon} from '@rneui/themed';
import {ScrollView, View} from 'react-native';
import OrderOverlay from '../components/orders/OrderOverlay';
import {useMutation, useQuery} from '@tanstack/react-query';
import {addOrder} from '../helpers/orders/ordersHelpers';
import {ErrorResponse} from '../interfaces/auth/authInterfaces';
import {defaultOrders} from '../redux/orders/ordersSlice';
import {fetchUpgrades} from '../helpers/upgrades/upgradesHelpers';
import {setUpgrades} from '../redux/upgrades/upgradesSlice';

export enum OrderMethod {
  takeaway = 'Takeaway',
  delivery = 'Delivery',
}

export type RootStackParams = {
  AuthStack: undefined;
  BottomRootStack: undefined;
};

const RootStack = createStackNavigator<RootStackParams>();

const AppNavigation = () => {
  const dispatch = useAppDispatch();

  const isAuth = useAppSelector(state => !!state.auth.access_token);
  const {meals, orderUpgrades, total} = useAppSelector(state => state.orders);
  const {upgrades} = useAppSelector(state => state.upgrades);

  const [openOverlay, setOpenOverlay] = useState(false);
  const [comments, setComments] = useState('');
  const [isDelivery, setIsDelivery] = useState(true);
  const [isTakeaway, setIsTakeaway] = useState(false);
  const [orderMethod, setOrderMethod] = useState<OrderMethod>(
    OrderMethod.delivery,
  );

  useEffect(() => {
    if (isDelivery) {
      setOrderMethod(OrderMethod.delivery);
    } else if (isTakeaway) {
      setOrderMethod(OrderMethod.takeaway);
    }
  }, [isDelivery, isTakeaway]);

  const upgradesQuery = useQuery({
    queryKey: ['upgrades'],
    queryFn: fetchUpgrades,
    refetchOnReconnect: false,
    enabled: false,
    refetchOnMount: false,
  });

  const {data, error, isError, isLoading, mutate, isSuccess} = useMutation({
    mutationFn: addOrder,
  });

  const getUpgradesQueryData = async () => {
    const {data, isError, error} = await upgradesQuery.refetch();
    if (isError) {
      return Toast.show({
        type: 'error',
        text1:
          `${(error as ErrorResponse)?.response?.data?.message}` ||
          `${(error as Error).message}`,
        text2: 'An error has occured please check your internet connection',
      });
    }
    return dispatch(setUpgrades(data!));
  };

  useEffect(() => {
    if (openOverlay) {
      getUpgradesQueryData();
    }
  }, [openOverlay]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(defaultOrders());
      Toast.show({
        type: 'success',
        text1: `${data.message}`,
        text2: 'Your order will be ready in aproximatley 25 minutes',
        position: 'top',
      });
      setOpenOverlay(false);
      setComments('');
    }
  }, [isSuccess, dispatch]);

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
                  {meals.length === 0 ? null : (
                    <Badge
                      status="success"
                      value={meals.length}
                      containerStyle={{position: 'absolute', top: -6, right: 5}}
                    />
                  )}
                  <ScrollView>
                    <OrderOverlay
                      total={total}
                      meals={meals}
                      upgrades={upgrades}
                      orderUpgrades={orderUpgrades}
                      buttonLoading={isLoading}
                      isVisible={openOverlay}
                      toggleOverlay={() =>
                        setOpenOverlay(prevOpenOverlay => !prevOpenOverlay)
                      }
                      comments={comments}
                      onCommentTextChange={text => setComments(text)}
                      onOrderNow={() =>
                        mutate({
                          meals,
                          upgrades: orderUpgrades,
                          comments,
                          method: orderMethod,
                        })
                      }
                      errorMessage={
                        (error as ErrorResponse)?.response?.data?.message ||
                        (error as Error)?.message ||
                        null
                      }
                      isError={isError}
                      isDelivery={isDelivery}
                      isTakeaway={isTakeaway}
                      setIsDelivery={() => {
                        setIsDelivery(true);
                        setIsTakeaway(false);
                      }}
                      setIsTakeaway={() => {
                        setIsTakeaway(true);
                        setIsDelivery(false);
                      }}
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
