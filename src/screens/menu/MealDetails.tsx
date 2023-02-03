import {View, Text} from 'react-native';
import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {MenuStackParams} from '../../navigation/menu/MenuNavigationStack';

type props = StackScreenProps<MenuStackParams, 'MealDetails'>;

const MealDetails = ({route, navigation}: props) => {
  const {mealId} = route.params;
  return (
    <View>
      <Text>{mealId}</Text>
    </View>
  );
};

export default MealDetails;
