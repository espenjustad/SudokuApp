import React from 'react';
import { View, StyleSheet } from 'react-native';
import Cell from './Cell';


const Board = ({ sudokuData, onPress, markedCell }) => {
  return (
    <View style={styles.board}>
      {sudokuData.map((rowData, rowIndex) => (
        <View key={rowIndex} style={[styles.row, rowIndex % 3 === 2 && styles.bottomBorder]}>
          {rowData.map((cellData, columnIndex) => (
            <View
              key={columnIndex}
              style={[
                styles.cell,
                columnIndex % 3 === 2 && styles.rightBorder,
              ]}
            >
              <Cell value={cellData}
                isEditable={cellData == null}
                isMarked={markedCell.row == rowIndex && markedCell.column == columnIndex}
                onPress={() => onPress(rowIndex, columnIndex)}/>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    borderWidth: 4,  // Thick border around the entire board
    borderColor: 'black',
    flexDirection: 'column',
    width: 400,
    height: 400
  },
  row: {
    flexDirection: 'row',
    flex: 1
  },
  cell: {
    flex: 1, 
  },
  bottomBorder: {
    borderBottomWidth: 4, 
    borderBottomColor: 'black',
},
  rightBorder: {
    borderRightWidth: 4, 
    borderRightColor: 'black',
  },
});

export default Board;
