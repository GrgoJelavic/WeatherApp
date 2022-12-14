import React, { useState, useEffect } from 'react';
import { Card, Button, TextInput } from 'react-native-paper';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import Header from './Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Asyncstorage: ...']);
LogBox.ignoreAllLogs();

const Search = ({ navigation }) => {
  const [city, setCity] = useState('');
  const [cities, setCities] = useState('');
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  let latitude, longitude;
  let text = 'Fetching..';

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  errorMsg ? (text = 'Fetching..') : (text = JSON.stringify(location));
  if (text !== 'Fetching..') {
    let coordinates = JSON.parse(text);
    if (coordinates) {
      const { coords } = coordinates;
      ({ latitude, longitude } = coords);
    }
  }

  const apiKey = 'AIzaSyCWVLxPcXSKI-t0AG-ew6fACGLDi6ZIpQU';

  let currentCity = '';
  const fetchCurrentCity = async () => {
    await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
    )
      .then((data) => data.json())
      .then((result) => {
        currentCity = result.results[0].address_components[2].long_name;
      })
      .catch((err) => {
        console.error(err);
      });
  };
  fetchCurrentCity();

  const getCities = (input) => {
    setCity(input);
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${input}.json?access_token=pk.eyJ1IjoiZ3Jnb2plIiwiYSI6ImNsN3FsMTRpODA2ZmUzcG5reHNqa3I3dG0ifQ.n8pCPkSY9FlZ0gqqjNqixA&cachebuster=1625641871908&autocomplete=true&types=place`
    )
      .then((item) => item.json())
      .then((city) => {
        setCities(city.features.slice(0, 5));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  checkIfCityExists = (input) => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${input}.json?access_token=pk.eyJ1IjoiZ3Jnb2plIiwiYSI6ImNsN3FsMTRpODA2ZmUzcG5reHNqa3I3dG0ifQ.n8pCPkSY9FlZ0gqqjNqixA&cachebuster=1625641871908&autocomplete=true&types=place`
    )
      ? true
      : false;
  };

  const storeCity = async (city) => {
    try {
      if (city.includes(',')) city = city.split(',')[0];
      await AsyncStorage.setItem(city, city);
    } catch (err) {
      console.error(err);
    }
  };

  const storeCurrentCity = async (currentCity) => {
    try {
      console.log(`AAA  ${currentCity}`);
      await AsyncStorage.setItem('currentCity', currentCity);
    } catch (err) {
      console.error(err);
    }
  };
  const btnSave = async () => {
    // (checkIfCityExists(city)) {
    if (city !== '') {
      storeCity(city);
      navigation.navigate('home', { city: city });
    }
  };

  const listCityClick = async (cityName) => {
    storeCity(cityName);
    setCity(cityName);
    navigation.navigate('home', { city: cityName });
  };

  const btnCurrentLocation = () => {
    if (currentCity) {
      console.log(`curr ${currentCity}`);
      // if (currentCity !== 'currentCity') {
      setCity(currentCity);
      // storeCurrentCity(currentCity);
      // }
      navigation.navigate('home', { city: currentCity });
    }
  };

  const getStoredCurrentCity = async () => {
    try {
      currentCity = await AsyncStorage.getItem('currentCity');
    } catch (err) {
      console.error(err);
    }
  };
  getStoredCurrentCity();

  const getStoredCity = async () => {
    try {
      const value = await AsyncStorage.getItem(`${city}`);
      if (value !== null) {
        console.log(`${value}`);
      }
    } catch (err) {
      console.error(err);
    }
  };
  // getStoredCity;

  clearAllStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log('Storage clear - Done.');
    } catch (err) {
      console.error(err);
    }
  };
  // clearAllStorage();

  return (
    <View>
      <Header name='Search'></Header>
      <TextInput
        label='Search for a city'
        style={styles.container}
        onChangeText={(input) => getCities(input)}
        value={{ city }}
        theme={{ colors: { primary: '#00aaff' } }}
      />
      <Button
        style={btnStyle.container}
        icon='content-save'
        mode='contained'
        onPress={() => {
          btnSave();
        }}
        theme={{ colors: { primary: '#00aaff' } }}
      >
        <Text style={btnTitleStyle.container}>Save city</Text>
      </Button>
      <Button
        style={btnStyle.container}
        icon='content-save'
        mode='contained'
        onPress={() => {
          btnCurrentLocation();
        }}
        theme={{ colors: { primary: '#00aaff' } }}
      >
        <Text style={btnTitleStyle.container}>Current location</Text>
      </Button>
      <FlatList
        data={cities}
        renderItem={({ item }) => {
          return (
            <Card
              style={cardStyle.container}
              onPress={() => {
                listCityClick(item.place_name);
              }}
            >
              <Text>{item.place_name}</Text>
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

const btnStyle = StyleSheet.create({
  container: {
    color: 'black',
    marginHorizontal: 80,
    marginVertical: 4,
  },
});

const btnTitleStyle = StyleSheet.create({
  container: {
    color: '#fff',
  },
});

const cardStyle = StyleSheet.create({
  container: {
    padding: 16,
    margin: 4,
  },
});

export default Search;
