import React from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import SignIn from './SignIn';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword';
import {faFilm} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Auth as AmplifyAuth} from '@aws-amplify/auth/lib-esm/Auth';
import Colors from '../../Theme/Colors.js';
const {width} = Dimensions.get('window');

class Auth extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    showSignUp: false,
    formType: 'showSignIn',
  };

  componentDidMount() {
    this._checkAuth();
  }

  _checkAuth = async () => {
    try {
      await AmplifyAuth.currentAuthenticatedUser();
      this.props.navigation.navigate('MainApp');
    } catch (err) {
      console.log('user is not signed in');
    }
  };

  toggleAuthType = (formType) => {
    this.setState({formType});
  };

  _onLogin = () => {
    this.props.navigation.navigate('MainApp');
  };

  render() {
    const showSignIn = this.state.formType === 'showSignIn';
    const showSignUp = this.state.formType === 'showSignUp';
    const showForgotPassword = this.state.formType === 'showForgotPassword';
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View>
          <FontAwesomeIcon icon={faFilm} size={50} />
        </View>
        <Text style={styles.title}>My Cilma</Text>

        {showSignIn && (
          <SignIn
            toggleAuthType={this.toggleAuthType}
            login={() => this._onLogin()}
          />
        )}
        {showSignUp && <SignUp toggleAuthType={this.toggleAuthType} />}
        {showForgotPassword && (
          <ForgotPassword toggleAuthType={this.toggleAuthType} />
        )}

        <View style={{position: 'absolute', bottom: 40}}>
          {showSignUp || showForgotPassword ? (
            <Text style={styles.bottomMessage}>
              Already signed up?{' '}
              <Text
                style={styles.bottomMessageHighlight}
                onPress={() => this.toggleAuthType('showSignIn')}>
                &nbsp;&nbsp;Sign In
              </Text>
            </Text>
          ) : (
            <Text style={styles.bottomMessage}>
              Need an account?
              <Text
                onPress={() => this.toggleAuthType('showSignUp')}
                style={styles.bottomMessageHighlight}>
                &nbsp;&nbsp;Sign Up
              </Text>
            </Text>
          )}
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
  },
  logo: {
    height: width / 2.5,
  },
  title: {
    fontSize: 26,
    marginTop: 15,
    marginBottom: 15,
    fontFamily:
      Platform.OS === 'android' ? 'sansationLight' : 'Sansation-Light',
    color: Colors.primaryColor,
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 20,
    color: Colors.primaryColor,
    fontFamily:
      Platform.OS === 'android' ? 'sansationLight' : 'Sansation-Light',
  },
  bottomMessage: {
    fontFamily:
      Platform.OS === 'android' ? 'sansationLight' : 'Sansation-Light',
    fontSize: 18,
  },
  bottomMessageHighlight: {
    color: Colors.primaryColor,
    paddingLeft: 10,
  },
});

export default Auth;
