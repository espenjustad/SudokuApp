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
};

const saveSudokuBoard = async (boardData, difficulty) => {
  const filePath = `${sudokuDirectory}/${difficulty}_board.json`;

  try {
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

const loadAllSudokuBoards = async (difficulty) => {
    try {
      const directoryPath = `${BOARD_DIRECTORY}/${difficulty}`;
      const boards = await FileSystem.readDirectoryAsync(directoryPath);
  
      const boardData = await Promise.all(
        boards.map(async (board) => {
          const filePath = `${directoryPath}/${board}`;
          const fileContents = await FileSystem.readAsStringAsync(filePath);
          return JSON.parse(fileContents);
        })
      );
  
      return boardData;
    } catch (error) {
      console.error('Error loading Sudoku boards:', error);
      return null;
    }
  };


const setupInitialBoards = async () => {
    const easyBoard = [
        [5, 3, null, null, 7, null, null, null, null],
        [6, null, null, 1, 9, 5, null, null, null],
        [null, 9, 8, null, null, null, null, 6, null],
        [8, null, null, null, 6, null, null, null, 3],
        [4, null, null, 8, null, 3, null, null, 1],
        [7, null, null, null, 2, null, null, null, 6],
        [null, 6, null, null, null, null, 2, 8, null],
        [null, null, null, 4, 1, 9, null, null, 5],
        [null, null, null, null, 8, null, null, 7, 9],
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

export { createSudokuDirectory, saveSudokuBoard, loadSudokuBoard, setupInitialBoards, loadAllSudokuBoards };
