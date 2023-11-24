import { StyleSheet, Text, View, Image, Button, Modal, FlatList, TouchableOpacity} from 'react-native';
import Board from '../components/Board';
import NumberSelector from '../components/NumberSelector';
import React, {useState} from 'react';


export default function GameScreen() {
  const [selectedNumber, setSelectedNumber] = useState(null)

  const [SudokuData, setSudokuData] = useState([
    [5, 3, null,  null, 7, null,  null, null, null],
    [6, null, null, 1, 9, 5, null, null, null],
    [null, 9, 8,  null, null, null, null, 6, null],
    [8, null, null, null, 6, null, null, null, 3],
    [4, null, null, 8, null, 3, null, null, 1],
    [7, null, null, null, 2, null, null, null, 6],
    [null, 6, null, null, null, null, 2, 8, null],
    [null, null, null, 4, 1, 9, null, null, 5],
    [null, null, null, null, 8, null, null, 7, 9],
  ])


  function handleCellPress(rowIndex, columnIndex) {
    setSudokuData((prevData) => {
      const newData = [...prevData];
      newData[rowIndex] = [...newData[rowIndex]]; 
      newData[rowIndex][columnIndex] = selectedNumber;
      return newData;
    });

  }
  


    return(
        <View style={styles.container}>
            <Board sudokuData={SudokuData} onPress={(rowIndex, columnIndex) => handleCellPress(rowIndex, columnIndex)}></Board>
            <NumberSelector onPress={(number) => setSelectedNumber(number)}></NumberSelector>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#753742',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
      },
});