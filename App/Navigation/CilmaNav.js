import React from 'react';
import {Platform} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBookmark, faSearch} from '@fortawesome/free-solid-svg-icons';
import Home from '../Screens/Home';
import MovieList from '../Screens/MovieList';
import WishList from '../Screens/WishList';
import Colors from '../Theme/Colors';
import Auth from '../Screens/auth/Auth';
import Splash from '../Screens/Splash.js';

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

/* ---------------------------------------- */
/* ---------------------------------------- */

const SearchNav = createStackNavigator(
  {
    Search: {screen: Home},
    Movies: {screen: MovieList},
  },
  {defaultNavigationOptions: defaultStackNavOptions},
);

const AuthNav = createStackNavigator(
  {
    Auth: {screen: Auth},
  },
  {defaultNavigationOptions: defaultStackNavOptions, headerMode: 'none'},
);

const LoadNav = createStackNavigator(
  {
    Auth: {screen: Splash},
  },
  {headerMode: 'none'},
);

/* ---------------------------------------- */
/* ---------------------------------------- */

const tabScreenConfig = {
  Search: {
    screen: SearchNav,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <FontAwesomeIcon icon={faSearch} />;
      },
      tabBarColor: Colors.primaryColor,
      tabBarLabel: 'Search',
    },
  },
  WishList: {
    screen: WishList,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <FontAwesomeIcon icon={faBookmark} />;
      },
      tabBarColor: Colors.primaryColor,
      tabBarLabel: 'Wishlist',
    },
  },
};

const MyCilmaNav = createBottomTabNavigator(tabScreenConfig, {
  tabBarOptions: {
    labelStyle: {
      fontFamily:
        Platform.OS === 'android' ? 'sansationLight' : 'Sansation-Light',
    },
    activeTintColor: Colors.ratingBox,
  },
});

// const MyCilmaNav = createDrawerNavigator(
//   {
//     Home: {
//       screen: MyCilmaTabNav,
//       navigationOptions: {
//         drawerLabel: 'Search',
//       },
//     },
//   },
//   {
//     contentOptions: {
//       activeTintColor: Colors.primaryColor,
//     },
//   },
// );

/* ---------------------------------------- */
/* ---------------------------------------- */

const mainNav = createSwitchNavigator(
  {
    AppAuth: AuthNav,
    MainApp: MyCilmaNav,
    AppLoad: LoadNav,
  },
  {
    initialRouteName: 'AppLoad',
  },
);

export default createAppContainer(mainNav);
