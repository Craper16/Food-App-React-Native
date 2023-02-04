import {View, Text, StyleSheet, Alert} from 'react-native';
import React from 'react';
import {useAppDispatch} from '../../redux/hooks';
import {defaultAuth} from '../../redux/auth/authSlice';
import {clearKeychain} from '../../helpers/keychain/keychainHelpers';
import {Button} from '@rneui/base';
import {defaultMeals} from '../../redux/meals/mealsSlice';
import {Colors} from '../../constants/colors/colorsConsts';
import {Icon} from '@rneui/themed';
import {StackScreenProps} from '@react-navigation/stack';
import {SettingsStackParams} from '../../navigation/settings/SettingsNavigation';

type props = StackScreenProps<SettingsStackParams, 'Settings'>;

const Settings = ({navigation}: props) => {
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await clearKeychain();
    dispatch(defaultAuth());
    dispatch(defaultMeals());
  };

  return (
    <View style={styles.screen}>
      <Text>Settings</Text>
      <Button
        icon={
          <Icon
            style={styles.icons}
            type="meterial-community"
            name="account-circle"
            color={Colors.secondary}
          />
        }
        color="secondary"
        style={styles.actions}>
        Account
      </Button>
      <Button
        icon={
          <Icon
            style={styles.icons}
            type="meterial-community"
            name="info"
            color={Colors.secondary}
          />
        }
        color="secondary"
        style={styles.actions}>
        About us
      </Button>
      <Button
        icon={
          <Icon
            style={styles.icons}
            type="meterial-community"
            name="logout"
            color={Colors.secondary}
          />
        }
        color="error"
        onPress={() =>
          Alert.alert('Logout', 'Are you sure you want to logout?', [
            {
              text: 'Logout',
              onPress: () => handleLogout(),
              style: 'destructive',
            },
            {text: 'Cancel', style: 'cancel'},
          ])
        }
        style={styles.actions}>
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
  actions: {
    margin: 12,
  },
  icons: {
    marginRight: 25,
  },
});

export default Settings;
