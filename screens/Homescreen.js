import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, Modal, FlatList, TouchableOpacity} from 'react-native';
import i18next, {languageResources} from "../services/i18next"
import { useTranslation } from 'react-i18next';
import React, {useState} from 'react';
import languagesList from '../services/languageList.json';

const logoImg = require("../assets/Sudoku.png")

export default function Homescreen({ navigation }) {
  const {t} = useTranslation()
  const [languageVisible, setLanguageVisible] = useState(false);
  const [descriptionVisible, setDescriptionVisible] = useState(false)

  const changeLng = lng => {
    i18next.changeLanguage(lng);
    setLanguageVisible(false);
  };

  return (
    
    <View style={styles.container}>
      <Text style={styles.title}>Sudoku</Text>
      <Image source={logoImg}></Image>
      <Modal animationType="slide" visible={languageVisible} onRequestClose={() => setLanguageVisible(false)}>
        <View style={styles.languagesList}>
          <FlatList
            data={Object.keys(languageResources)}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.languageButton}
                onPress={() => changeLng(item)}>
                <Text style={styles.lngName}>
                  {languagesList[item].nativeName}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
      <TouchableOpacity
        style={styles.normalButton}
        onPress={() => setLanguageVisible(true)}
      >
        <Text style={styles.buttonText}>{t('change-language')}</Text>
      </TouchableOpacity>
      <Modal animationType="slide" visible={descriptionVisible} onRequestClose={() => setDescriptionVisible(false)}>
        <View style={styles.container}>
            <View>
            <Text style={styles.descriptionView}>{t('rules')}</Text>
            </View>
            <TouchableOpacity
              style={styles.normalButton}
              onPress={() => setDescriptionVisible(false)}
            >
              <Text style={styles.buttonText}>{t('close')}</Text>
            </TouchableOpacity>
        </View>
      </Modal>
      <TouchableOpacity
        style={styles.normalButton}
        onPress={() => setDescriptionVisible(true)}
      >
        <Text style={styles.buttonText}>{t('show-description')}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.startButton}
        onPress={() => navigation.navigate("Options")}
      >
        <Text style={styles.startButtonText}>{t('start')}</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
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
    padding: 6
  },
  normalButton: {
    backgroundColor: '#001021',
    padding: 10,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 2,
    marginBottom: 15
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
  languagesList: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#753742',
  },

  languageButton: {
    padding: 10,
    borderBottomColor: 'white',
    borderBottomWidth: 2,
    backgroundColor: "#001021"
  },
  lngName: {
    fontSize: 25,
    color: 'white',
  },
  descriptionView: {
    fontSize: 20,
    backgroundColor: 'white',
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
    borderColor: '#001021',
    borderWidth: 2,
    marginBottom: 20
  },
  startButton: {
    marginTop: 15,
    backgroundColor: '#001021',
    padding: 10,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 2,
    marginBottom: 15
  },

  startButtonText: {
    fontSize: 30,
    color: 'white',
  }
});