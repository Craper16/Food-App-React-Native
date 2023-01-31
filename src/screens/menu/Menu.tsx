import {View, Text} from 'react-native';
import React from 'react';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {FlashList} from '@shopify/flash-list';
import {clearKeychain} from '../../helpers/keychain/keychainHelpers';
import {defaultAuth} from '../../redux/auth/authSlice';
import {Button} from '@rneui/base';
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

  console.log(isFetching);

  const handleLogout = async () => {
    await clearKeychain();
    dispatch(defaultAuth());
  };

  return (
    <View>
      <Text>{`Welcome ${firstName}`}</Text>
      <Button onPress={handleLogout}>Logout</Button>
    </View>
  );
};

export default Menu;
