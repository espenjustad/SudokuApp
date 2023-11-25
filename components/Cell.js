import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Cell = ({ value, isEditable, onPress, isMarked }) => {
  
  return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
             <Text style={[styles.buttonText, isMarked && styles.markedText]}>{value}</Text>
        </TouchableOpacity>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  buttonText: {
    fontSize: 30,
    color: 'black',
  },
  markedText: {
    fontSize: 30,
    color: 'orange', // Change this to the color you want for marked numbers
  },
});

export default Cell;
