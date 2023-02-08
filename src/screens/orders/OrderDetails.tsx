import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useEffect} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {OrdersStackParams} from '../../navigation/orders/OrdersNavigation';
import {useMutation, useQuery} from '@tanstack/react-query';
import {deleteOrder, getUserOrder} from '../../helpers/orders/ordersHelpers';
import {Colors} from '../../constants/colors/colorsConsts';
import {ErrorResponse} from '../../interfaces/auth/authInterfaces';
import Toast from 'react-native-toast-message';
import {Button} from '@rneui/themed';
import {useAppDispatch} from '../../redux/hooks';
import {removeUserOrder} from '../../redux/orders/ordersSlice';

type props = StackScreenProps<OrdersStackParams, 'OrderDetails'>;

const OrderDetails = ({route, navigation}: props) => {
  const dispatch = useAppDispatch();

  const {goBack} = navigation;

  const {orderId} = route.params;

  const {data, isFetching, error, isError} = useQuery({
    queryKey: ['orderItem'],
    queryFn: () => getUserOrder(orderId),
    retry: true,
    retryDelay: 5000,
  });

  const deleteOrderMutation = useMutation({
    mutationFn: (orderId: string) => deleteOrder(orderId),
    onSuccess: response => {
      dispatch(removeUserOrder({orderId: response.deletedOrder._id}));
      goBack();
    },
  });

  useEffect(() => {
    if (isError || deleteOrderMutation.isError) {
      Toast.show({
        type: 'error',
        text1: 'An error has occured',
        text2:
          (error as ErrorResponse)?.response?.data?.message ||
          (deleteOrderMutation.error as ErrorResponse)?.response.data.message ||
          'Please check your network connection and try again',
        autoHide: isError || deleteOrderMutation.isError ? false : true,
      });
    } else {
      Toast.hide();
    }
  }, [isError, deleteOrderMutation.isError]);

  if (isError || deleteOrderMutation.isError) {
    return <View style={styles.screen}></View>;
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
      <View style={styles.orderIdContainer}>
        <Text style={styles.orderIdText}>Order: {data?._id}</Text>
      </View>
      <View style={styles.methodContainer}>
        <Text style={styles.methodText}>{'Method: ' + data?.method}</Text>
      </View>
      <View style={styles.orderIdContainer}>
        <Text style={styles.orderIdText}>MEALS</Text>
      </View>
      <View>
        {data?.meals.map((meal, i) => (
          <View key={i} style={styles.mealContainer}>
            <Text style={styles.mealText}>{meal.title}</Text>
            <Text style={styles.mealText}>
              {meal.description.substring(0, 20) + '...'}
            </Text>
            <Text style={styles.mealText}>{'$' + meal.price}</Text>
          </View>
        ))}
      </View>
      <View style={styles.orderIdContainer}>
        <Text style={styles.orderIdText}>UPGRADES</Text>
      </View>
      <View style={styles.emptyUpgradesContainer}>
        {data?.upgrades.length === 0 ? (
          <Text style={styles.emptyUpgradesText}>
            No upgrades in this order
          </Text>
        ) : (
          data?.upgrades.map((upgrade, i) => (
            <View key={i} style={styles.mealContainer}>
              <Text style={styles.mealText}>{upgrade.title}</Text>
              <Text style={styles.mealText}>{'$' + upgrade.price}</Text>
            </View>
          ))
        )}
      </View>
      <View style={styles.commentsContainer}>
        <Text style={styles.mealText}>
          {data?.comments ? data?.comments : 'No comments on this order'}
        </Text>
      </View>
      <View style={styles.methodContainer}>
        <Text style={styles.methodText}>
          {'Ordered at: ' +
            data?.updatedAt.toString().split('T')[0] +
            ' at ' +
            data?.updatedAt.toString().split('T')[1].split('.')[0]}
        </Text>
      </View>
      <View style={styles.methodContainer}>
        <Text style={styles.methodText}>
          {data?.isDelivered ? 'Delivered' : 'Pending'}
        </Text>
      </View>
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>{'TOTAL: $' + data?.amountToPay}</Text>
      </View>
      <View>
        {data?.isDelivered ? null : (
          <Button
            color="error"
            onPress={() =>
              Alert.alert(
                'Cancel Order',
                'Are you sure you want to cancel your order?',
                [
                  {style: 'cancel', text: 'No'},
                  {
                    text: 'Yes',
                    style: 'destructive',
                    onPress: () => deleteOrderMutation.mutate(data?._id!),
                  },
                ],
              )
            }>
            Cancel Order
          </Button>
        )}
      </View>
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
  orderIdContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 12,
  },
  orderIdText: {
    color: Colors.secondary,
    fontSize: 20,
    fontWeight: 'bold',
  },
  methodContainer: {
    margin: 14,
  },
  methodText: {
    fontWeight: '500',
    color: Colors.secondary,
    fontSize: 15,
  },
  mealContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-evenly',
    margin: 6,
  },
  mealText: {
    color: Colors.secondary,
    fontSize: 15,
  },
  emptyUpgradesContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 3,
  },
  emptyUpgradesText: {
    color: Colors.secondary,
  },
  commentsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 7,
  },
  totalContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    margin: 12,
  },
  totalText: {
    fontSize: 23,
    color: Colors.secondary,
    fontWeight: 'bold',
  },
});

export default OrderDetails;
