import * as FileSystem from 'expo-file-system';

const sudokuDirectory = `${FileSystem.documentDirectory}sudoku_boards`;

const createSudokuDirectory = async () => {
  try {
    const { exists } = await FileSystem.getInfoAsync(sudokuDirectory);
    if (!exists) {
      await FileSystem.makeDirectoryAsync(sudokuDirectory);
      setupInitialBoards()
    }
  } catch (error) {
    console.error('Error creating Sudoku directory:', error);
  }
  //Remove comment to replace user created boards with standard boards.
  //setupInitialBoards()
};

const saveSudokuBoard = async (boardData, difficulty) => {
    const directoryPath = `${sudokuDirectory}/`;
  
    try {
      
      await FileSystem.makeDirectoryAsync(directoryPath, { intermediates: true });
  
      const filePath = `${directoryPath}/${difficulty}_board.json`;
  
      await FileSystem.writeAsStringAsync(filePath, JSON.stringify(boardData), { encoding: FileSystem.EncodingType.UTF8 });
      console.log(`Sudoku board saved to: ${filePath}`);
        } catch (error) {
      console.error('Error saving Sudoku board:', error);
    }
  };
  

const loadSudokuBoard = async difficulty => {
  const filePath = `${sudokuDirectory}/${difficulty}_board.json`;

  try {
    const fileContent = await FileSystem.readAsStringAsync(filePath, { encoding: FileSystem.EncodingType.UTF8 });
    const boardData = JSON.parse(fileContent);
    console.log(`Sudoku board loaded from: ${filePath}`);
    return boardData;
  } catch (error) {
    console.error('Error loading Sudoku board:', error);
    return null;
  }
};

const setupInitialBoards = async () => {
    const easyBoard = [
        [5, 3, 4, 6, 7, 8, 9, 1, 2],
        [6, 7, 2, 1, 9, 5, 3, 4, 8],
        [1, 9, 8, 3, 4, 2, 5, 6, 7],
        [8, 5, 9, 7, 6, 1, 4, 2, 3],
        [4, 2, 6, 8, 5, 3, 7, 9, 1],
        [7, 1, 3, 9, 2, 4, 8, 5, 6],
        [9, 6, 1, 5, 3, 7, 2, 8, 4],
        [2, 8, 7, 4, 1, 9, 6, 3, 5],
        [3, 4, 5, 2, 8, 6, 1, 7, null],
      ];
  
      const mediumBoard = [
        [1, null, null, null, 7, null, null, 9, null],
        [null, 3, null, null, null, null, null, null, 5],
        [null, null, 9, 2, null, null, null, null, 1],
        [null, null, null, null, null, 5, 8, null, null],
        [null, 5, null, null, 6, null, null, 2, null],
        [null, null, 4, 9, null, null, null, null, null],
        [5, null, null, null, null, 7, null, null, 3],
        [null, null, null, null, null, null, null, 5, null],
        [null, 8, null, null, 3, null, null, null, null],
      ];
      
      const hardBoard = [
        [8, null, null, null, null, null, null, null, null],
        [null, null, 3, 6, null, null, null, null, null],
        [null, 7, null, null, 9, null, 2, null, null],
        [null, 5, null, null, null, 7, null, null, null],
        [null, null, null, null, 4, 5, 7, null, null],
        [null, null, null, 1, null, null, null, 3, null],
        [null, null, 1, null, null, null, null, 6, 8],
        [null, null, 8, 5, null, null, null, 1, null],
        [null, 9, null, null, null, null, 4, null, null],
      ];
      
  
    await saveSudokuBoard(easyBoard, 'easy');
    await saveSudokuBoard(mediumBoard, 'medium');
    await saveSudokuBoard(hardBoard, 'hard');
}

const replaceLoadedBoard = async (difficulty, newBoardData) => {
    try {
      const directoryPath = `${sudokuDirectory}`;
  
      await FileSystem.makeDirectoryAsync(directoryPath, { intermediates: true });
  
      const filePath = `${directoryPath}/${difficulty}_board.json`;
  
      await FileSystem.writeAsStringAsync(filePath, JSON.stringify(newBoardData), { encoding: FileSystem.EncodingType.UTF8 });
      console.log(`Sudoku board saved to: ${filePath}`);
        } catch (error) {
      console.error('Error saving Sudoku board:', error);
    }
  };

export { createSudokuDirectory, saveSudokuBoard, loadSudokuBoard, setupInitialBoards, replaceLoadedBoard };
