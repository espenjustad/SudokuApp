// SudokuHomeScreen.js
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';

export default function SudokuHomeScreen({ navigation }) {
  const {t} = useTranslation()
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sudoku</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Game')}
      >
        <Text style={styles.buttonText}>{t('easy')}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Game')}
      >
        <Text style={styles.buttonText}>{t('medium')}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Game')}
      >
        <Text style={styles.buttonText}>{t('hard')}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('CreateNewBoard')}
      >
        <Text style={styles.buttonText}>{t('create-game')}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>{t('main-menu')}</Text>
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
  title: {
    color: 'black',
    fontSize: 50,
    fontWeight: 'bold',
    backgroundColor: 'white',
    borderColor: '#001021',
    borderWidth: 3,
    padding: 6,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#001021',
    padding: 10,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 2,
    marginBottom: 15,
    width: 200,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 30,
    color: 'white',
  },
});
