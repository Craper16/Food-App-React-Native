import {View, Text} from 'react-native';
import React from 'react';
import {useAppDispatch} from '../../redux/hooks';
import {defaultAuth} from '../../redux/auth/authSlice';
import {clearKeychain} from '../../helpers/keychain/keychainHelpers';
import {Button} from '@rneui/base';

const Settings = () => {
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await clearKeychain();
    dispatch(defaultAuth());
  };

  return (
    <View>
      <Text>Settings</Text>
      <Button onPress={handleLogout}>Logout</Button>
    </View>
  );
};

export default Settings;
