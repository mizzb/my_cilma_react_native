import React from 'react';
import {Dimensions, Platform, StyleSheet, TextInput} from 'react-native';
import Colors from '../Theme/Colors.js';
const {width} = Dimensions.get('window');

const Input = ({placeholder, type, secureTextEntry = false, onChangeText}) => (
  <TextInput
    style={styles.input}
    placeholder={placeholder}
    autoCapitalize="none"
    autoCorrect={false}
    onChangeText={(v) => onChangeText(type, v)}
    secureTextEntry={secureTextEntry}
    placeholderTextColor="#232323"
    selectionColor={'#4f3a42'}
  />
);

const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.accentColor,
    borderRadius: 5,
    height: 45,
    width: width - 20,
    marginBottom: 10,
    fontSize: 16,
    paddingHorizontal: 14,
    fontFamily:
      Platform.OS === 'android' ? 'sansationLight' : 'Sansation-Light',
    color: Colors.primaryColor,
  },
});

export default Input;
