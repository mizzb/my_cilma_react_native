import React, {Component} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faFilm} from '@fortawesome/free-solid-svg-icons';

export default class WishList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieDetails: '',
      searchString: '',
      isLoading: false,
      initialPosition: 'unknown',
      lastPosition: 'unknown',
    };
  }

  render() {
    return (
      <SafeAreaView>
        <ScrollView keyboardShouldPersistTaps="handled">
          <View>
            <FontAwesomeIcon icon={faFilm} size={50} />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({});
