import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import React from 'react';
import {Colors} from '../constants/colors/colorsConsts';

const StartupScreen = () => {
  return (
    <View style={styles.screen}>
      <Text style={styles.welcomeText}>Welcome to Saad Eats</Text>
      <ActivityIndicator
        style={styles.activity}
        size="large"
        animating={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.primary,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    textAlign: 'center',
    fontSize: 35,
    fontWeight: 'bold',
    color: Colors.secondary,
  },
  activity: {
    marginTop: '20%',
  },
});

export default StartupScreen;
