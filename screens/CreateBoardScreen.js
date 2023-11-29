import { StyleSheet, TouchableOpacity, View, Text, Alert} from 'react-native';
import Board from '../components/Board';
import NumberSelector from '../components/NumberSelector';
import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
import SelectDropdown from 'react-native-select-dropdown'
import { saveSudokuBoard, replaceLoadedBoard } from '../utils/SudokuUtils';



export default function CreateBoardScreen({ navigation }) {
  
  const {t} = useTranslation()
  const choices = [t('easy'), t('medium'), t('hard')]
  const [selectedDifficulty, setSelectedDifficulty] = useState(null)
  const [selectedNumber, setSelectedNumber] = useState(null)
  const [removeSelected, setRemoveSelected] = useState(false)
  const [markSelected, setMarkSelected] = useState(false)
  const [markedCell, setMarkedCell] = useState({row: null, column: null});
  const [SudokuData, setSudokuData] = useState([
    [null, null, null,  null, null, null,  null, null, null],
    [null, null, null,  null, null, null,  null, null, null],
    [null, null, null,  null, null, null,  null, null, null],
    [null, null, null,  null, null, null,  null, null, null],
    [null, null, null,  null, null, null,  null, null, null],
    [null, null, null,  null, null, null,  null, null, null],
    [null, null, null,  null, null, null,  null, null, null],
    [null, null, null,  null, null, null,  null, null, null],
    [null, null, null,  null, null, null,  null, null, null],
  ])


  function handleNumberPress(number) {
    if(number == selectedNumber) {
      setSelectedNumber(null)
    } else {
      setSelectedNumber(number)
    }
  }

  function handleCellPress(rowIndex, columnIndex) {
    setSudokuData((prevData) => {
      const newData = [...prevData];
      newData[rowIndex] = [...newData[rowIndex]]; 
      if(removeSelected) {
        newData[rowIndex][columnIndex] = null
      } else if (markSelected) {
        if (markedCell.row === rowIndex && markedCell.column === columnIndex) {
          setMarkedCell({row: null, column: null});
        } else {
          setMarkedCell({ row: rowIndex, column: columnIndex });
        }
      } else {
        if(selectedNumber !== null) {
          newData[rowIndex][columnIndex] = selectedNumber;
        }
      }
      return newData;
    });

  }

  function handleRemoveNumber() {
    setRemoveSelected(!removeSelected)
  }

  function handleSave() {
    if (selectedDifficulty && SudokuData.length > 0) {
      console.log(SudokuData)
      replaceLoadedBoard(selectedDifficulty, SudokuData)
        .then(() => {
          console.log(`Sudoku board for ${selectedDifficulty} saved successfully.`);
          Alert.alert(t('alert-title'), t('save-message'), [
            {
              text: t(''),
              onPress: () => navigation.navigate('Options'),
              style: styles.normalButton,
            }
        ]);
          navigation.navigate('Options')
        })
        .catch((error) => {
          console.error('Error saving/replacing Sudoku board:', error);
        });
    } else {
      console.warn('Please select a difficulty and provide Sudoku data.');
    }
  }
  
    return(
        <View style={styles.container}>
             <Board
                sudokuData={SudokuData}
                onPress={(rowIndex, columnIndex) => handleCellPress(rowIndex, columnIndex)}
                markedCell={markedCell}
              />
            <NumberSelector onPress={(number) => handleNumberPress(number)}></NumberSelector>
              <TouchableOpacity
                style={[styles.normalButton, removeSelected && styles.selectedButton]}
                onPress={() => handleRemoveNumber()}
              >
                <Text style={[styles.buttonText, removeSelected && styles.selectedText]}>{t('remove')}</Text>
              </TouchableOpacity>
            <SelectDropdown
                buttonStyle={styles.normalButton}
                buttonTextStyle={styles.buttonText}
                data={choices}
                onSelect={(selectedItem, index) => {
                    switch (index) {
                        case 0:
                            setSelectedDifficulty('easy')
                            break;
                        case 1:
                            setSelectedDifficulty('medium')
                            break;
                        case 2:
                            setSelectedDifficulty('hard')
                            break;
                    }
                }}
                buttonTextAfterSelection={(selectedItem) => {
                    return selectedItem
                }}
                rowTextForSelection={(item, index) => {
                    return item
                }}
                defaultButtonText={t('select-difficulty')}
            />
            <TouchableOpacity
                style={styles.saveButton}
                onPress={() => handleSave()}
              >
                <Text style={styles.saveButtonText}>{t('save')}</Text>
              </TouchableOpacity>
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
      selectedButton: {
        backgroundColor: '#001021',
        padding: 10,
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 2,
        marginBottom: 15,
        marginLeft: 20,
      },
      normalButton: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 2,
        marginBottom: 7,
      },
      buttonText: {
        fontSize: 25,
        color: 'black',
      },

      selectedText: {
        fontSize: 25,
        color: 'white',
      },
      saveButton: {
        marginTop: 15,
        backgroundColor: '#001021',
        padding: 10,
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 2,
        marginBottom: 15,
      },
      saveButtonText: {
        fontSize: 30,
        color: 'white',
      }
});