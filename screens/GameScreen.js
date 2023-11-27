import { StyleSheet, TouchableOpacity, View, Text, Modal} from 'react-native';
import Board from '../components/Board';
import NumberSelector from '../components/NumberSelector';
import React, {useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { loadSudokuBoard, loadAllSudokuBoards } from '../utils/SudokuUtils';





export default function GameScreen({ navigation, route }) {
  const {t} = useTranslation()
  const [selectedNumber, setSelectedNumber] = useState(null)
  const [removeSelected, setRemoveSelected] = useState(false)
  const [markSelected, setMarkSelected] = useState(false)
  const [markedCell, setMarkedCell] = useState({row: null, column: null});
  const [boardIsCorrect, setBoardIsCorrect] = useState(false)
  const [boardIsFinished, setBoardIsFinished] = useState(false)

  const [SudokuData, setSudokuData] = useState([
  ])

  useEffect(() => {
    const { difficulty } = route.params;
    const loadBoard = async () => {
      const boardData = await loadSudokuBoard(difficulty);
      console.log(boardData)
      if (boardData) {
        setSudokuData(boardData);
      } else {
        console.error('Error loading Sudoku board for difficulty:', difficulty);
      }
    };

    loadBoard();
  }, [route.params]);


  function handleNumberPress(number) {
    setSelectedNumber((prevNumber) => (prevNumber === number ? null : number));
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
    checkIfBoardIsFilled()
  }

  function handleRemoveNumber() {
    if(markSelected) {
      setMarkSelected(!markSelected)
    }
    setRemoveSelected(!removeSelected)
  }

  function handleMarkAsUnsure() {
    if(removeSelected) {
      setRemoveSelected(!removeSelected)
    }
   setMarkSelected(!markSelected)
  }

  function checkIfBoardIsFilled() {
    for (let i = 0; i < SudokuData.length; i++) {
      for (let j = 0; j < SudokuData[i].length; j++) {
        if (SudokuData[i][j] === null) {
          return false;
        }
      }
    }
    setBoardIsFinished(true);
    checkIfBoardIsCorrect()
  }

  function checkIfBoardIsCorrect() {
    for (let i = 0; i < SudokuData.length; i++) {
      const rowSet = new Set(SudokuData[i].filter((num) => num !== null));
      if (rowSet.size !== 9) {
        setBoardIsCorrect(false);
        return;
      }
    }

    for (let j = 0; j < 9; j++) {
      const columnSet = new Set();
      for (let i = 0; i < SudokuData.length; i++) {
        if (SudokuData[i][j] !== null) {
          columnSet.add(SudokuData[i][j]);
        }
      }
      if (columnSet.size !== 9) {
        setBoardIsCorrect(false);
        return;
      }
    }
  
    for (let gridRow = 0; gridRow < 3; gridRow++) {
      for (let gridCol = 0; gridCol < 3; gridCol++) {
        const gridSet = new Set();
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            const cellValue = SudokuData[gridRow * 3 + i][gridCol * 3 + j];
            if (cellValue !== null) {
              gridSet.add(cellValue);
            }
          }
        }
        if (gridSet.size !== 9) {
          setBoardIsCorrect(false);
          return;
        }
      }
    }
    setBoardIsCorrect(true);
  }
  
  


    return(
        <View style={styles.container}>
            <Modal animationType="slide" visible={boardIsFinished} onRequestClose={() => navigation.navigate('Options')}>
                <View style={styles.container}>
                    <View >
                    {boardIsCorrect ? (
                      <Text style={styles.result}>{t('congratulations')}</Text>
                    ) : (
                      <Text style={styles.result}>{t('wrong-board')}</Text>
                    )}
                    </View>
                    <TouchableOpacity
                    style={styles.newGameButton}
                    onPress={() => navigation.navigate("Options")}
                    >
                    <Text style={styles.selectedText}>{t('start-new-game')}</Text>
                    </TouchableOpacity>
                </View>
              </Modal>
             <Board
                sudokuData={SudokuData}
                onPress={(rowIndex, columnIndex) => handleCellPress(rowIndex, columnIndex)}
                markedCell={markedCell}
              />
            <NumberSelector onPress={(number) => handleNumberPress(number)}></NumberSelector>
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
      newGameButton: {
        backgroundColor: '#001021',
        padding: 10,
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 2,
        marginBottom: 15
      },
      buttonText: {
        fontSize: 25,
        color: 'black',
      },

      selectedText: {
        fontSize: 25,
        color: 'white',
      },
      result: {
        fontSize: 20,
        backgroundColor: 'white',
        marginLeft: 10,
        marginRight: 10,
        padding: 10,
        borderColor: '#001021',
        borderWidth: 2,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent:'center'
      },
});