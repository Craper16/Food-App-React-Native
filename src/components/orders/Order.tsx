import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Card} from '@rneui/themed';
import {Colors} from '../../constants/colors/colorsConsts';
import {MealData} from '../../interfaces/meals/mealsInterfaces';

type props = {
  createdAt: Date;
  _id: string;
  amountToPay: number;
  method: string;
  meals: MealData[];
  isDelivered: boolean;
};

const Order = ({
  _id,
  meals,
  amountToPay,
  createdAt,
  method,
  isDelivered,
}: props) => {
  return (
    <Card containerStyle={styles.container}>
      <Text style={styles.idText}>{'Order: ' + _id}</Text>
      <Card.Divider />
      <View style={styles.amountAndItemsContainer}>
        <Text style={styles.totalAmount}>{'Total: $' + amountToPay}</Text>
        <Text>{`${meals.length} Item(s)`}</Text>
      </View>
      <Text style={styles.orderedOnText}>
        {'Ordered on: ' +
          createdAt.toString().split('T')[0] +
          ` at ${createdAt.toString().split('T')[1].split('.')[0]}`}
      </Text>
      <Text style={styles.orderedOnText}>{'Method: ' + method}</Text>
      <Text style={styles.orderedOnText}>
        {isDelivered ? 'Delivered' : 'Pending'}
      </Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 19,
    backgroundColor: Colors.secondary,
    shadowColor: Colors.secondary,
  },
  idText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  totalAmount: {
    fontWeight: '500',
    fontSize: 15,
    textAlign: 'center',
  },
  amountAndItemsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 6,
  },
  orderedOnText: {
    fontSize: 15,
    margin: 4,
  },
});

export default Order;
