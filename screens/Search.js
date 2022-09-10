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

const Search = ({ navigation }) => {
  console.log('START');
  const [city, setCity] = useState('');
  const [cities, setCities] = useState('');
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

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
  let latitude, longitude;
  let text = 'Fetching..';
  errorMsg ? (text = 'Fetching..') : (text = JSON.stringify(location));
  if (text !== 'Fetching..') {
    let coordinates = JSON.parse(text);
    if (coordinates) {
      const { coords } = coordinates;
      ({ latitude, longitude } = coords);
    }
  }
  console.log(latitude);
  console.log(longitude);

  const apiKey = 'AIzaSyCWVLxPcXSKI-t0AG-ew6fACGLDi6ZIpQU';

  let currentCity = '';
  const getCurrentCity = async () => {
    await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
    )
      .then((data) => data.json())
      .then((result) => {
        console.log(
          `resultaT : ${JSON.stringify(
            result.results[0].address_components[2].long_name
          )}`
        );
        currentCity = JSON.stringify(
          result.results[0].address_components[2].long_name
        );
        console.log(`currentCity : ${currentCity}`);
        // }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  getCurrentCity();

  let i = 1;
  const getCities = (input) => {
    setCity(input);
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${input}.json?access_token=pk.eyJ1IjoiZ3Jnb2plIiwiYSI6ImNsN3FsMTRpODA2ZmUzcG5reHNqa3I3dG0ifQ.n8pCPkSY9FlZ0gqqjNqixA&cachebuster=1625641871908&autocomplete=true&types=place`
    )
      .then((item) => item.json())
      .then((city) => {
        setCities(city.features.slice(0, 5));
        // console.log(`getCities city :
        // ${city.features[0]['place_name']}`);
        // console.log(cities);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const btnSave = () => {
    console.log(`btnSave: ${city}`);
    // navigation.navigate('home', { city: city });
  };

  const listCityClick = (cityName) => {
    console.log(`cityName: ${cityName}`);
    setCity(cityName);
    // navigation.navigate('home', { city: cityName });
  };

  const btnCurrentLocation = () => {
    setTimeout(() => {
      console.log('Delayed for 2 second.');
      setCity(currentCity);
      console.log(`BtnCurrentLocation : ${currentCity}`);
      // navigation.navigate('home', { city: currentCity });
    }, 2000);
  };

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
          {
            btnSave();
          }
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
          {
            btnCurrentLocation();
          }
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
