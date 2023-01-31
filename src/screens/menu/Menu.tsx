import {View, Text} from 'react-native';
import React from 'react';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {FlashList} from '@shopify/flash-list';
import {useQuery} from '@tanstack/react-query';
import {fetchMeals} from '../../helpers/menu/menuHelpers';

const Menu = () => {
  const dispatch = useAppDispatch();
  const {email, firstName, lastName, phoneNumber} = useAppSelector(
    state => state.auth,
  );

  const {isError, error, isFetching} = useQuery({
    queryKey: ['meals'],
    queryFn: fetchMeals,
    retry: true,
    onSuccess: response => response.map(meal => console.log(meal._id)),
  });

  return (
    <View>
      <Text>{`Welcome ${firstName} ${lastName}`}</Text>
    </View>
  );
};

export default Menu;
