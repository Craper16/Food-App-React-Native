import {View, Text} from 'react-native';
import React from 'react';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {clearKeychain} from '../../helpers/keychain/keychainHelpers';
import {defaultAuth} from '../../redux/auth/authSlice';
import {Button} from '@rneui/base';

const Menu = () => {
  const dispatch = useAppDispatch();
  const {email, firstName, lastName, phoneNumber} = useAppSelector(
    state => state.auth,
  );

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
