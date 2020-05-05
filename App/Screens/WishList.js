import React, {Component} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';

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
            <Text>Coming soon</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({});
