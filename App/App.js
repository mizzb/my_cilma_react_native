/**
 * @format
 * @flow strict-local
 */
import React, {Component} from 'react';
import AppContainer from './Navigation/CilmaNav';

class App extends Component {
  state = {
    currentView: 'initializing',
  };

  render() {
    return <AppContainer />;
  }
}

export default App;
