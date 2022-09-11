import React, { useState, useEffect } from 'react';
import { Card, Button, TextInput } from 'react-native-paper';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import Header from './Header';
import icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Asyncstorage: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const Cities = ({ navigation }) => {
  const [allKeys, setGetLocalStorageKeys] = useState([]);
  const [arrayItems, setArrayItems] = useState([]);
  const [city, setCity] = useState('');

  setTimeout(() => {
    // console.log('Delayed for 1 second.');
  }, 1000);

  const getLocalStorageKeys = async () => {
    try {
      setGetLocalStorageKeys(await AsyncStorage.getAllKeys());
    } catch (e) {}
  };

  const getItem = async (prop) => {
    try {
      const item = await AsyncStorage.getItem(prop);
      return item != null ? JSON.parse(item) : null;
    } catch (e) {}
  };

  useEffect(() => {
    try {
      getLocalStorageKeys();
      for (let i = 0; i < allKeys.length; i++) {
        arrayItems.push(getItem(allKeys[i]));
      }
    } catch (e) {}
  }, []);

  useEffect(() => {
    getLocalStorageKeys();
  }, []);

  useEffect(() => {
    const tempArr = [];
    if (allKeys.length > 0) {
      for (let i = 0; i < allKeys.length; i++) {
        tempArr.push(getItem(allKeys[i]));
      }
    }
    setArrayItems(tempArr);
  }, [allKeys]);

  const listCityClick = async (cityName) => {
    // storeCity(cityName);
    console.log(`cityName: ${cityName}`);
    setCity(cityName);
    navigation.navigate('home', { city: cityName });
    getStoredCity();
  };
  return (
    <View>
      <Header name='Stored Cities'></Header>
      <FlatList
        data={allKeys}
        renderItem={({ item }) => {
          return (
            <Card
              style={cardStyle.container}
              onPress={() => {
                listCityClick(item);
              }}
            >
              <Text>{item}</Text>
            </Card>
          );
        }}
        keyExtractor={(item) => item}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
});

const cardStyle = StyleSheet.create({
  container: {
    padding: 16,
    margin: 4,
  },
});

export default Cities;
