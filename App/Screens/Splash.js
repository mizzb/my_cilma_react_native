import React, {Component} from 'react';
import {
  AsyncStorage,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import {PacmanIndicator} from 'react-native-indicators';
import {Auth as AmplifyAuth} from '@aws-amplify/auth/lib-esm/Auth';
import {Auth} from 'aws-amplify';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export default class WishList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.checkAuth();
  }

  checkAuth = async () => {
    try {
      const user = await AmplifyAuth.currentAuthenticatedUser();

      try {
        const keys = ['@Access_token', '@Id_token', '@Refresh_token'];
        await AsyncStorage.multiRemove(keys);
        const access_token = [
          '@Access_token',
          user.signInUserSession.accessToken.jwtToken,
        ];
        const id_token = ['@Id_token', user.signInUserSession.idToken.jwtToken];
        const refresh_token = [
          '@Refresh_token',
          user.signInUserSession.refreshToken.token,
        ];
        await AsyncStorage.multiSet([access_token, id_token, refresh_token]);
      } catch (e) {
        console.log('Error saving Tokens', e);
        await Auth.signOut();
        this.props.navigation.navigate('AppAuth');
      }
      this.props.navigation.navigate('MainApp');
    } catch (err) {
      this.props.navigation.navigate('AppAuth');
    }
  };

  render() {
    return (
      <SafeAreaView>
        <View style={styles.view}>
          <PacmanIndicator color="black" />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    width: width,
    height: height,
  },
});
