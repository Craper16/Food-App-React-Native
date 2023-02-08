import {View, StyleSheet, Text, RefreshControl} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../../constants/colors/colorsConsts';
import {useQuery} from '@tanstack/react-query';
import {getUserOrders} from '../../helpers/orders/ordersHelpers';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {resetUserOrders, setUserOrders} from '../../redux/orders/ordersSlice';
import {FlashList} from '@shopify/flash-list';
import {OrderResponse} from '../../interfaces/orders/ordersInterfaces';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Order from '../../components/orders/Order';
import {StackScreenProps} from '@react-navigation/stack';
import {OrdersStackParams} from '../../navigation/orders/OrdersNavigation';
import Toast from 'react-native-toast-message';
import {ErrorResponse} from '../../interfaces/auth/authInterfaces';

type props = StackScreenProps<OrdersStackParams, 'Orders'>;

const Orders = ({navigation}: props) => {
  const {navigate} = navigation;
  const dispatch = useAppDispatch();

  const [isRefreshing, setIsRefreshing] = useState(false);

  const {userOrders} = useAppSelector(state => state.orders);

  const {data, isError, error, isFetching, refetch} = useQuery({
    queryKey: ['orders'],
    queryFn: getUserOrders,
    onSuccess: response => dispatch(setUserOrders(response)),
  });

  const handleRefresh = async () => {
    setIsRefreshing(true);
    dispatch(resetUserOrders());
    await refetch();
    setIsRefreshing(false);
  };

  useEffect(() => {
    if (isError) {
      Toast.show({
        type: 'error',
        text1: 'An error has occured',
        text2:
          (error as ErrorResponse)?.response?.data?.message ||
          'Please check your network connection and try again',
        autoHide: isError ? false : true,
      });
    } else {
      Toast.hide();
    }
  }, [isError]);

  if (isError) {
    return <View style={styles.screen}></View>;
  }

  useEffect(() => {
    if (userOrders.length === 0 && data?.length !== 0) {
      refetch();
    }
  }, [userOrders.length, data?.length]);

  const ListEmpty = () => {
    return (
      <View>
        <Text style={styles.noOrdersFound}>
          You havent ordered anything yet
        </Text>
      </View>
    );
  };

  const RenderItem = ({item}: {item: OrderResponse}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigate('OrderDetails', {orderId: item._id})}>
        <Order
          _id={item._id}
          meals={item.meals}
          amountToPay={item.amountToPay}
          createdAt={item.createdAt}
          method={item.method}
          isDelivered={item.isDelivered}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.screen}>
      <FlashList
        data={userOrders}
        renderItem={RenderItem}
        keyExtractor={item => item._id}
        ListEmptyComponent={
          userOrders.length === 0 && data?.length === 0 ? ListEmpty : null
        }
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor={Colors.secondary}
          />
        }
        estimatedItemSize={50}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  noOrdersFound: {
    marginTop: '50%',
    textAlign: 'center',
    fontSize: 25,
    color: Colors.secondary,
    fontWeight: 'bold',
  },
});

export default Orders;
