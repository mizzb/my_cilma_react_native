import React from 'react';
import {
  TouchableHighlight,
  Text,
  View,
  StyleSheet,
  Platform,
} from 'react-native';
import Colors from '../Theme/Colors.js';


const ActionButton = ({onPress, title}) => (
  <TouchableHighlight
    onPress={onPress}
    style={styles.buttonContainer}
    underlayColor="#ffbf2d">
    <View style={styles.button}>
      <Text style={styles.buttonText}>{title}</Text>
    </View>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: Colors.primaryColor,
    borderRadius: 10,
  },
  button: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontFamily:
      Platform.OS === 'android' ? 'sansationLight' : 'Sansation-Light',
  },
});

export default ActionButton;
