import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {FlashList} from '@shopify/flash-list';
import {useQuery} from '@tanstack/react-query';
import {fetchMeals} from '../../helpers/menu/menuHelpers';
import {
  defaultMeals,
  filterMeals,
  setMeals,
} from '../../redux/meals/mealsSlice';
import {ErrorResponse} from '../../interfaces/auth/authInterfaces';
import {Colors} from '../../constants/colors/colorsConsts';
import Meals from '../../components/meals/Meals';
import {MealData} from '../../interfaces/meals/mealsInterfaces';
import {StackScreenProps} from '@react-navigation/stack';
import {MenuStackParams} from '../../navigation/menu/MenuNavigationStack';
import {SearchBar} from '@rneui/themed';

type props = StackScreenProps<MenuStackParams, 'Menu'>;

const Menu = ({navigation}: props) => {
  const [search, setSearch] = useState<string>('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const {navigate} = navigation;

  const dispatch = useAppDispatch();

  const {meals, filteredMeals} = useAppSelector(state => state.meals);

  const {isError, error, isFetching, data, refetch} = useQuery({
    queryKey: ['meals'],
    queryFn: fetchMeals,
    retry: true,
    onSuccess: response => dispatch(setMeals(response)),
  });

  const handleRefresh = async () => {
    setIsRefreshing(true);
    dispatch(defaultMeals());
    await refetch();
    setIsRefreshing(false);
  };

  useEffect(() => {
    if (search) {
      dispatch(filterMeals(search));
    }
  }, [dispatch, search]);

  const RenderMeals = ({item}: {item: MealData}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigate('MealDetails', {mealId: item._id})}>
        <Meals mealData={item} onAddToOrder={() => console.log('Its rinning')} />
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
      <SearchBar
        value={search}
        onChangeText={text => setSearch(text)}
        style={styles.inputField}
      />
      {search ? (
        <FlashList
          data={filteredMeals}
          keyExtractor={item => item._id}
          estimatedItemSize={100}
          renderItem={item => RenderMeals(item)}
        />
      ) : (
        <FlashList
          data={meals}
          keyExtractor={item => item._id}
          refreshControl={
            <RefreshControl
              onRefresh={handleRefresh}
              refreshing={isRefreshing}
              tintColor={Colors.secondary}
            />
          }
          estimatedItemSize={100}
          renderItem={item => RenderMeals(item)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  inputField: {
    color: Colors.secondary,
  },
});

export default Menu;
