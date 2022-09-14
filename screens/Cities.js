import React, { useState, useEffect } from 'react';
import { Card } from 'react-native-paper';
import { StyleSheet, View, Text, FlatList, Button } from 'react-native';
import Header from './Header';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Cities = ({ navigation }) => {
  const [allKeys, setGetLocalStorageKeys] = useState([]);
  const [arrayItems, setArrayItems] = useState([]);

  const deleteCityFromTheStorage = (city) => {
    try {
      if (!city) city = '';
      AsyncStorage.removeItem(city);
      console.log(`REMOVED ${city}`);
    } catch (error) {
      console.error(error);
    }
  };

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
              <Text style={txtStyle.container}>
                {item}
                <Button
                  onPress={() => {
                    deleteCityFromTheStorage(item);
                  }}
                  style={btnStyle.container}
                  title='Delete'
                  // size={20}
                  color='red'
                />
              </Text>
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
    flex: 2,
  },
});

const cardStyle = StyleSheet.create({
  container: {
    // flexDirection: 'row',
    // justifyContent: 'space-betwwen',
    // alignItems: 'center',
    // paddingLeft: 100,
    // paddingRight: 0,
    // paddingTop: 10,
    // padding: 50,
  },
});

const txtStyle = StyleSheet.create({
  container: {
    margin: 20,
    flex: 1,
  },
});

const btnStyle = StyleSheet.create({
  container: {},
});

export default Cities;
