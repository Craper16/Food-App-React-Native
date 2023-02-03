import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {MealData} from '../../interfaces/meals/mealsInterfaces';
import {Button, Card, Image} from '@rneui/themed';

type props = {
  mealData: MealData;
  onAddToOrder: () => void;
};

const Meals = ({mealData, onAddToOrder}: props) => {
  return (
    <Card>
      <Card.Title style={styles.titleStyle}>
        {mealData.title.toUpperCase()}
      </Card.Title>
      <Card.Divider />
      <View>
        <Image
          style={{width: '100%', height: 400}}
          source={{uri: mealData.image, scale: 0.5}}
          containerStyle={styles.imageStyle}
        />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.descStyle}>{mealData.description}</Text>
        <Text style={styles.priceStyle}>{`$${mealData.price}`}</Text>
      </View>
      <Button>Add to Order</Button>
    </Card>
  );
};

const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 19,
  },
  detailsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  descStyle: {
    margin: 9,
  },
  priceStyle: {
    margin: 9,
    fontWeight: 'bold',
    fontSize: 25,
  },
  imageStyle: {aspectRatio: 1, width: '100%', flex: 1},
});

export default Meals;
