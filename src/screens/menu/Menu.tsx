import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {FlashList} from '@shopify/flash-list';
import {useQuery} from '@tanstack/react-query';
import {fetchMeals} from '../../helpers/menu/menuHelpers';
import {setMeals} from '../../redux/meals/mealsSlice';
import {ErrorResponse} from '../../interfaces/auth/authInterfaces';
import {Colors} from '../../constants/colors/colorsConsts';
import Meals from '../../components/meals/Meals';
import {MealData} from '../../interfaces/meals/mealsInterfaces';
import {StackScreenProps} from '@react-navigation/stack';
import {MenuStackParams} from '../../navigation/menu/MenuNavigationStack';

type props = StackScreenProps<MenuStackParams, 'Menu'>;

const Menu = ({navigation}: props) => {
  const {navigate} = navigation;

  const dispatch = useAppDispatch();

  const {meals} = useAppSelector(state => state.meals);

  const {isError, error, isFetching, data} = useQuery({
    queryKey: ['meals'],
    queryFn: fetchMeals,
    retry: true,
    onSuccess: response => dispatch(setMeals(response)),
  });

  const RenderMeals = ({item}: {item: MealData}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigate('MealDetails', {mealId: item._id})}>
        <Meals
          mealData={item}
          onAddToOrder={() => console.log(`Added ${item.title}`)}
        />
      </TouchableOpacity>
    );
  };

  if (isError) {
    return (
      <View>
        <Text>
          {(error as ErrorResponse).response.data.message ||
            (error as Error).message ||
            'Please check your network connection'}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <FlashList
        data={meals}
        keyExtractor={item => item._id}
        estimatedItemSize={100}
        renderItem={item => RenderMeals(item)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
});

export default Menu;
