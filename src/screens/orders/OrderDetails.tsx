import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {OrdersStackParams} from '../../navigation/orders/OrdersNavigation';
import {useQuery} from '@tanstack/react-query';
import {getUserOrder} from '../../helpers/orders/ordersHelpers';
import {Colors} from '../../constants/colors/colorsConsts';
import {ErrorResponse} from '../../interfaces/auth/authInterfaces';

type props = StackScreenProps<OrdersStackParams, 'OrderDetails'>;

const OrderDetails = ({route}: props) => {
  const {orderId} = route.params;

  const {data, isFetching, error, isError} = useQuery({
    queryKey: ['orderItem'],
    queryFn: () => getUserOrder(orderId),
  });

  if (isError) {
    return (
      <View style={styles.screen}>
        <Text style={styles.apiError}>
          {(error as ErrorResponse)?.response?.data?.message ||
            'Please check your network connection and try again'}
        </Text>
      </View>
    );
  }

  return isFetching ? (
    <View style={styles.screen}>
      <ActivityIndicator
        color={Colors.secondary}
        size="large"
        style={styles.activity}
      />
    </View>
  ) : (
    <ScrollView style={styles.screen}>
      <Text>{data?.amountToPay}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  apiError: {
    fontSize: 20,
    marginTop: 20,
    textAlign: 'center',
    color: 'tomato',
  },
  activity: {
    marginTop: '50%',
  },
});

export default OrderDetails;
