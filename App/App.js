/**
 * @format
 * @flow strict-local
 */
import React, {useEffect} from 'react';
import CilmaNav from './Navigation/CilmaNav';
import SplashScreen from 'react-native-splash-screen';

function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return <CilmaNav />;
}

export default App;
