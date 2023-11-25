import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import NumberButton from '../components/NumberButton';

const NumberSelector = ({ onPress }) => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [selectedNumber, setSelectedNumber] = useState(null);

  const handleNumberPress = (number) => {
    if(number === selectedNumber) {
        setSelectedNumber(null)
        onPress(number)
    } else {
        setSelectedNumber(number);
        onPress(number)
    }
  };

  return (
    <View style={styles.container}>
      {numbers.map((num) => (
        <NumberButton
          key={num}
          value={num}
          isSelected={selectedNumber === num}
          onPress={() => handleNumberPress(num)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center', 
        alignItems: 'center', 
        width: 400, 
        height: 120,
      },
});

export default NumberSelector;

