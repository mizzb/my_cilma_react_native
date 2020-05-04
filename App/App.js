/**
 * @format
 * @flow strict-local
 */
import React, {Component} from 'react';
import {Auth as AmplifyAuth} from 'aws-amplify';
import AppContainer from './Navigation/CilmaNav';
class App extends Component {
  state = {
    currentView: 'initializing',
  };

  componentDidMount() {
    this.checkAuth();
  }

  checkAuth = async () => {
    try {
      await AmplifyAuth.currentAuthenticatedUser();
      console.log('user is signed in');
      this.setState({currentView: 'mainNav'});
    } catch (err) {
      console.log('user is not signed in');
      this.setState({currentView: 'auth'});
    }
  };

  render() {
    return <AppContainer />;
  }
}

export default App;
