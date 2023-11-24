import { StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import Board from '../components/Board';
import NumberSelector from '../components/NumberSelector';
import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';



export default function GameScreen() {
  const {t} = useTranslation()
  const [selectedNumber, setSelectedNumber] = useState(null)
  const [removeSelected, setRemoveSelected] = useState(false)
  const [markSelected, setMarkSelected] = useState(false)

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
      if(removeSelected) {
        newData[rowIndex][columnIndex] = null
      } else if (markSelected) {
        newData[rowIndex][columnIndex] = null
      } else {
        newData[rowIndex][columnIndex] = selectedNumber;
      }
      return newData;
    });

  }

  function handleRemoveNumber() {
    setRemoveSelected(!removeSelected)
  }

  function handleMarkAsUnsure() {
   setMarkSelected(!markSelected)
  }
  


    return(
        <View style={styles.container}>
            <Board sudokuData={SudokuData} onPress={(rowIndex, columnIndex) => handleCellPress(rowIndex, columnIndex)}></Board>
            <NumberSelector onPress={(number) => setSelectedNumber(number)}></NumberSelector>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={[styles.normalButton, removeSelected && styles.selectedButton]}
                onPress={() => handleRemoveNumber()}
              >
                <Text style={[styles.buttonText, removeSelected && styles.selectedText]}>{t('remove')}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.normalButton, markSelected && styles.selectedButton]}
                onPress={() => handleMarkAsUnsure()}
              >
                <Text style={[styles.buttonText, markSelected && styles.selectedText]}>{t('mark')}</Text>
              </TouchableOpacity>
            </View>
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
      buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10,
      },
      selectedButton: {
        backgroundColor: '#001021',
        padding: 10,
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 2,
        marginBottom: 15,
        marginLeft: 20
      },
      normalButton: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 2,
        marginBottom: 15,
        marginLeft: 20
      },
      buttonText: {
        fontSize: 25,
        color: 'black',
      },

      selectedText: {
        fontSize: 25,
        color: 'white',
      },
});