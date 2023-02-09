import {View, Text, ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import {Colors} from '../../constants/colors/colorsConsts';

const Categories = () => {
  return (
    <ScrollView style={styles.screen}>
      <Text>Categories</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
});

export default Categories;
