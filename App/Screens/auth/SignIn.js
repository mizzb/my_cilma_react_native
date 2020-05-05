import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import {AsyncStorage} from 'react-native';
import {Auth} from 'aws-amplify';

import {Input, ActionButton} from '../../components';

class SignIn extends Component {
  state = {
    username: '',
    password: '',
  };

  onChangeText = (key, value) => {
    this.setState({[key]: value});
  };

  signIn = async () => {
    const {username, password} = this.state;
    try {
      const user = await Auth.signIn(username, password);
      try {
        await AsyncStorage.setItem(
          '@Access_token',
          user.signInUserSession.accessToken.jwtToken,
        );
        await AsyncStorage.setItem(
          '@Id_token',
          user.signInUserSession.idToken.jwtToken,
        );
        await AsyncStorage.setItem(
          '@Refresh_token',
          user.signInUserSession.refreshToken.token,
        );
      } catch (e) {
        console.log('Error saving Tokens', e);
        await Auth.signOut();
        this.props.navigation.navigate('AppAuth');
      }
      console.log(user);
      this.props.login();
    } catch (err) {
      Alert.alert('Login Failed', err);
      console.log('error signing in...', err);
    }
  };

  showForgotPassword = () => {
    this.props.toggleAuthType('showForgotPassword');
  };

  render() {
    return (
      <View>
        <Input
          onChangeText={this.onChangeText}
          type="username"
          placeholder="Username"
        />
        <Input
          onChangeText={this.onChangeText}
          type="password"
          placeholder="Password"
          secureTextEntry
        />
        <ActionButton title="Sign In" onPress={this.signIn} />
        <View style={styles.buttonContainer}>
          <TouchableHighlight
            underlayColor="rgba(118,44,23,0.5)"
            onPress={this.showForgotPassword}>
            <Text>Forget your password?</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    paddingTop: 15,
    justifyContent: 'center',
    flexDirection: 'row',
    fontFamily:
      Platform.OS === 'android' ? 'sansationLight' : 'Sansation-Light',
  },
});

export default SignIn;
