/* @flow */

import React, {Component} from 'react';
import {
  Alert,
  Button,
  Dimensions,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {PacmanIndicator} from 'react-native-indicators';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBars, faFilm, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';
import Colors from '../Theme/Colors';
import {Auth} from 'aws-amplify';

const width = Dimensions.get('window').width; //full width
const height = Dimensions.get('window').height; //full height
var self;

class Home extends Component {
  state = {
    movieDetails: '',
    searchString: '',
    isLoading: false,
    initialPosition: 'unknown',
    lastPosition: 'unknown',
  };

  watchID: ?number = null;
  getLocation() {
    Geolocation.getCurrentPosition(
      (position) => {
        const initialPosition = JSON.stringify(position);
        console.log(initialPosition);
        this.setState({initialPosition});
      },
      (error) => {
        console.log('ERROR:' + error.toString());
        Alert.alert('Error', 'My Cilma requires your Locations');
        this.getLocation();
      },
      {enableHighAccuracy: true, timeout: 20000},
    );
  }

  componentDidMount() {
    this.getLocation();
    this.watchID = Geolocation.watchPosition((position) => {
      const lastPosition = JSON.stringify(position);
      this.setState({lastPosition});
      //console.log(lastPosition);
    });
    this.props.navigation.setParams({onLogout: this._onSignOut});
  }

  componentWillUnmount() {
    this.watchID != null && Geolocation.clearWatch(this.watchID);
  }

  goForFetch = (movieToSearch) => {
    const searchApi =
      'http://bournetechnicals.com/my-cilma/?api_key=1053ed93e54449fca1076a8b07b85803&name=' +
      movieToSearch;
    axios
      .get(searchApi)
      .then((response) => {
        console.log('Response:' + response);
        this.setState({movieDetails: response.data});
        this.setState({isLoading: false});
        if (this.state.movieDetails.title !== undefined) {
          this.props.navigation.navigate('Movies', {
            movie: this.state.movieDetails,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({isLoading: false});
        Alert.alert('Uff..!', 'Sorry we cant find the movie you searched for!');
      });
  };

  _onSearchTextChanged = (event) => {
    this.setState({searchString: event.nativeEvent.text});
  };

  _executeQuery = () => {
    this.setState({isLoading: true});
  };

  _onSearchPressed = () => {
    if (!this.state.isLoading) {
      this._executeQuery();
      this.goForFetch(this.state.searchString);
    }
  };

  _onSignOut = async () => {
    try {
      await Auth.signOut();
      this.props.navigation.navigate('AppAuth');
    } catch (err) {
      console.log('error signing out...', err);
    }
  };

  render() {
    const showSearch = this.state.isLoading ? (
      <PacmanIndicator color="black" />
    ) : (
      <Button
        title="GO"
        color="#c4c0b3"
        onPress={this._onSearchPressed}
        disabled={this.state.isLoading || this.state.searchString === ''}
        style={styles.searchBtn}
      />
    );

    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scrollView}
          keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
            <FontAwesomeIcon
              icon={faFilm}
              size={50}
              style={styles.searchLogo}
            />
            <View style={styles.flowRight}>
              <TextInput
                underlineColorAndroid={'transparent'}
                style={styles.searchInput}
                value={this.state.searchString}
                onChange={this._onSearchTextChanged}
                placeholderTextColor="#143309"
                placeholder="Your movie here !"
              />
            </View>
            <View style={styles.buttonView}>{showSearch}</View>

            <View style={styles.mansionView}>
              <Text style={styles.mansion}>
                Powered by Mansionites! A quarantine product
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

Home.navigationOptions = (navData) => {
  return {
    // headerLeft: () => {
    //   return (
    //     <FontAwesomeIcon
    //       icon={faBars}
    //       color={Colors.white}
    //       style={styles.barStyle}
    //       onPress={() => {
    //         navData.navigation.toggleDrawer();
    //       }}
    //     />
    //   );
    // },

    headerRight: () => {
      return (
        <FontAwesomeIcon
          icon={faSignOutAlt}
          color={Colors.white}
          style={styles.barStyle}
          onPress={() => {
            console.log(navData.navigation.getParam('onLogout')());
          }}
        />
      );
    },
  };
};

const styles = StyleSheet.create({
  barStyle: {
    padding: 0,
    margin: 10,
  },
  loader: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
  },
  safeArea: {flex: 1},
  container: {
    flex: 1,
    width: width,
    height: height,
    backgroundColor: Colors.background,
    alignItems: 'center',
  },
  flowRight: {
    margin: 30,
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  searchLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 65,
  },
  searchInput: {
    fontFamily:
      Platform.OS === 'android' ? 'sansationLight' : 'Sansation-Light',
    height: 50,
    width: '100%',
    padding: 15,
    marginRight: 0,
    flexGrow: 1,
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#143309',
    color: '#143309',
  },
  buttonView: {
    flex: 1,
    width: '25%',
    flexDirection: 'column',
    //alignItems: 'center',
    //alignSelf: 'stretch',
  },
  mansionView: {
    position: 'absolute', //Here is the trick
    bottom: 100,
  },
  mansion: {
    fontFamily:
      Platform.OS === 'android' ? 'sansationLight' : 'Sansation-Light',
  },
});

export default Home;
