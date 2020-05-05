/**
 * @format
 * @flow strict-local
 */
import React, {Component} from 'react';
import AppContainer from './Navigation/CilmaNav';
import Amplify from 'aws-amplify';
import config from '../aws-exports';
Amplify.configure(config);
class App extends Component {
  render() {
    return <AppContainer />;
  }s
}

export default App;
