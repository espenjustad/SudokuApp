import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const NumberButton = ({ value, isSelected, onPress }) => {
  const handlePress = () => {
    onPress(value);
  };

  return (
      <TouchableOpacity onPress={handlePress} style={[styles.buttonContainer, isSelected && styles.selected]}>
        <View>
          <Text style={[styles.buttonText, isSelected && styles.textSelected]}>{value}</Text>
        </View>
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  
  buttonContainer: {
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    flex: 1,
  },
  buttonText: {
    fontSize: 30,
    color: 'black',
  },
  selected: {
    backgroundColor: '#001021',
  },

  textSelected: {
    color: 'white'
  },
});

export default NumberButton;
