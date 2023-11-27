import { StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import Board from '../components/Board';
import NumberSelector from '../components/NumberSelector';
import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
import SelectDropdown from 'react-native-select-dropdown'



export default function CreateBoardScreen() {
  
  const {t} = useTranslation()
  const choices = [t('easy'), t('medium'), t('hard')]
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
                    console.log(selectedItem, index)
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
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
        flex: 1
      },
      saveButtonText: {
        fontSize: 30,
        color: 'white',
      }
});