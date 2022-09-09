import React, { useState } from 'react';
import { Card, Button, TextInput } from 'react-native-paper';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import Header from './Header';
import icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Search = ({ navigation }) => {
  const [city, setCity] = useState('');
  const [cities, setCities] = useState('');
  const btnSave = () => {
    navigation.navigate('home', { city: city });
  };
  const listCityClick = (cityName) => {
    setCity(cityName);
    navigation.navigate('home', { city: cityName });
  };
  let i = 1;
  const getCities = (input) => {
    setCity(input);
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${input}.json?access_token=pk.eyJ1IjoiZ3Jnb2plIiwiYSI6ImNsN3FsMTRpODA2ZmUzcG5reHNqa3I3dG0ifQ.n8pCPkSY9FlZ0gqqjNqixA&cachebuster=1625641871908&autocomplete=true&types=place`
    )
      .then((item) => item.json())
      .then((city) => {
        setCities(city.features.slice(0, 9));

        // city.features.slice(0, 9);
        // setCities({
        //   key: Math.random(1),
        //   value: city.features.slice(0, 9),
        //   value: city.features[0]['place_name'],
        // });
        // console.log(cities.features[0][]);
        // console.log(city.features[0]);
        console.log(cities);
        // console.log(city.features[0]['place_name']);
      });
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
