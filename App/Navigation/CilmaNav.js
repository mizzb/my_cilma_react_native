import React from 'react';
import {Platform} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Home from '../Screens/Home';
import MovieList from '../Screens/MovieList';

import Colors from '../Theme/Colors';

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Colors.primaryColor,
  },
  headerTitleStyle: {
    fontFamily:
      Platform.OS === 'android' ? 'sansationLight' : 'Sansation-Light',
  },
  headerBackTitleStyle: {
    fontFamily:
      Platform.OS === 'android' ? 'sansationLight' : 'Sansation-Light',
  },
  headerTintColor: 'white',
  headerTitle: 'My Cilma',
};

const CilmaNav = createStackNavigator(
  {
    Search: {screen: Home},
    Movies: {screen: MovieList},
  },
  {defaultNavigationOptions: defaultStackNavOptions},
);
export default createAppContainer(CilmaNav);
