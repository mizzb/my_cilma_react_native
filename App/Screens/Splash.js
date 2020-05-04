import React, {Component} from 'react';
import {Dimensions, SafeAreaView, StyleSheet, View} from 'react-native';
import {PacmanIndicator} from 'react-native-indicators';
import {Auth as AmplifyAuth} from '@aws-amplify/auth/lib-esm/Auth';

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
      await AmplifyAuth.currentAuthenticatedUser();
      console.log('User not logged in');
      this.props.navigation.navigate('MainApp');
    } catch (err) {
      console.log('User not logged in');
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
