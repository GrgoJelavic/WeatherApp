import React, { useState, useEffect } from 'react';
import { Card } from 'react-native-paper';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import Header from './Header';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Cities = ({ navigation }) => {
  const [allKeys, setGetLocalStorageKeys] = useState([]);
  const [arrayItems, setArrayItems] = useState([]);

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

  const listCityClick = async (cityName) =>
    navigation.navigate('home', { city: cityName });

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
