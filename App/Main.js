/**
 * @format
 * @flow strict-local
 */
import React, {useEffect} from 'react';
import App from './App';
import SplashScreen from 'react-native-splash-screen';
import Amplify from 'aws-amplify';
import {YellowBox} from 'react-native';
import config from '../aws-exports';

YellowBox.ignoreWarnings(['Remote']);
Amplify.configure(config);

function Main() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return <App />;
}

export default Main;
