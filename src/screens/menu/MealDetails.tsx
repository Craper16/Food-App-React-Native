import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {MenuStackParams} from '../../navigation/menu/MenuNavigationStack';
import {useQuery} from '@tanstack/react-query';
import {fetchMeal} from '../../helpers/menu/menuHelpers';
import {ErrorResponse} from '../../interfaces/auth/authInterfaces';
import {Colors} from '../../constants/colors/colorsConsts';
import {Button, Header, Image} from '@rneui/themed';
import {Skeleton} from '@rneui/base';

type props = StackScreenProps<MenuStackParams, 'MealDetails'>;

const MealDetails = ({route, navigation}: props) => {
  const {mealId} = route.params;

  const {data, error, isError, isFetching, isSuccess} = useQuery({
    queryKey: ['meal'],
    queryFn: async () => await fetchMeal(mealId),
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
      <Text style={styles.titleField}>{data?.title.toUpperCase()}</Text>
      <Image
        style={{width: '100%', height: 500}}
        source={{uri: data?.image}}
        containerStyle={styles.imageStyle}
      />
      <Text style={styles.textField}>{data?.description}</Text>
      <Button color="secondary" onPress={() => console.log(data?._id)}>
        Add to order
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  activity: {
    marginTop: '50%',
  },
  titleField: {
    color: Colors.secondary,
    fontWeight: 'bold',
    marginTop: 25,
    fontSize: 30,
    textAlign: 'center',
  },
  textField: {
    color: Colors.secondary,
    textAlign: 'center',
    margin: 15,
    fontSize: 18,
  },
  apiError: {
    fontSize: 20,
    marginTop: 20,
    textAlign: 'center',
    color: 'tomato',
  },
  imageStyle: {
    aspectRatio: 0.5,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
    height: 520,
    flex: 1,
  },
});

export default MealDetails;
