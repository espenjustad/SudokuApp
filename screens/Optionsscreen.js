import { StyleSheet, Text, View, Image, Button, Modal, FlatList, TouchableOpacity} from 'react-native';
import Board from '../components/Board';

export default function Optionsscreen() {
    
    const sudokuData = [
        [5, 3, null,  null, 7, null,  null, null, null],
        [6, null, null, 1, 9, 5, null, null, null],
        [null, 9, 8,  null, null, null, null, 6, null],
        [8, null, null, null, 6, null, null, null, 3],
        [4, null, null, 8, null, 3, null, null, 1],
        [7, null, null, null, 2, null, null, null, 6],
        [null, 6, null, null, null, null, 2, 8, null],
        [null, null, null, 4, 1, 9, null, null, 5],
        [null, null, null, null, 8, null, null, 7, 9],
      ];
    return(
        <View style={styles.container}>
            <Board sudokuData={sudokuData}></Board>
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