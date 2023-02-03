import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {useAppDispatch} from '../../redux/hooks';
import {defaultAuth} from '../../redux/auth/authSlice';
import {clearKeychain} from '../../helpers/keychain/keychainHelpers';
import {Button} from '@rneui/base';
import {useQuery} from '@tanstack/react-query';
import {getUserData} from '../../helpers/auth/authHelpers';
import {defaultMeals} from '../../redux/meals/mealsSlice';
import {Colors} from '../../constants/colors/colorsConsts';

const Settings = () => {
  const dispatch = useAppDispatch();

  const {status} = useQuery({
    queryKey: ['userData'],
    queryFn: getUserData,
  });

  const handleLogout = async () => {
    await clearKeychain();
    dispatch(defaultAuth());
    dispatch(defaultMeals());
  };

  return (
    <View style={styles.screen}>
      <Text>Settings</Text>
      <Button color="secondary" onPress={handleLogout}>
        Logout
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
});

export default Settings;
