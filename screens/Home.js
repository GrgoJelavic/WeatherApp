import React, { useState, useEffect } from 'react';
import { Card, Button, TextInput, Title } from 'react-native-paper';
import {
  Image,
  StyleSheet,
  View,
  Text,
  FlatList,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Header from './Header';
import icon from 'react-native-vector-icons/Ionicons';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import * as TaskManager from 'expo-task-manager';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = (props) => {
  const [data, setData] = useState({
    name: 'fetching city name',
    description: 'fetching weather description',
    temperature: 'fetching air temperature',
    pressure: 'fetching air pressure',
    humidity: 'fetching air humidity',
    wind: 'fetching wind speed',
    icon: 'getting weather icon',
  });

  useEffect(() => {
    fetchWeather();
  }, []);

  const appid = 'bab0eced610dc6fe6d14fd460fa5b2de';
  let myCity;
  let storedCities = [];

  const fetchWeather = () => {
    const { city } = props.route.params;
    // currentCity === '' ? (myCity = city) : (myCity = currentCity);
    myCity = city;
    console.log(`myCity : ${myCity}`);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${myCity}&appid=${appid}`
    )
      .then((data) => data.json())
      .then((result) => {
        // console.log(result);
        setData({
          name: result.name,
          description: result.weather[0].description,
          temperature: result.main.temp,
          pressure: result.main.pressure,
          humidity: result.main.humidity,
          wind: result.wind.speed,
          icon: result.weather[0].icon,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  getAllKeys = async () => {
    try {
      storedCities = await AsyncStorage.getAllKeys();
    } catch (err) {
      console.error(err);
    }
    console.log(`HOME ${storedCities}`);
  };
  getAllKeys();
  console.log(`my city ${myCity}`);

  onChange = (nativeEvent) => ({});
  if (
    props.route.params.city !== 'London' &&
    props.route.params.city !== data.name &&
    props.route.params.city !== myCity
  )
    fetchWeather();

  return (
    <>
      <SafeAreaView>
        <View>
          <ScrollView
            onScroll={({ nativeEvent }) => onChange(nativeEvent)}
            showsHorizontalScrollIndicator
            pagingEnabled
            // vertical
          >
            <Header name='The' />
            <Title style={titleStyle.container}>{data.name}</Title>
            <Image
              style={{ width: 200, height: 200 }}
              source={{
                uri: `https://openweathermap.org/img/w/${data.icon}.png`,
              }}
            ></Image>

            <Card>
              <Title style={cardStyle.container}>
                air temperature: {data.temperature}
              </Title>
            </Card>
            <Card>
              <Title style={cardStyle.container}>
                air pressure: {data.pressure}
              </Title>
            </Card>
            <Card>
              <Title style={cardStyle.container}>
                air humidity: {data.humidity}
              </Title>
            </Card>
            <Card>
              <Title style={cardStyle.container}>wind speed: {data.wind}</Title>
            </Card>
            <Card>
              <Title style={cardStyle.container}>
                weather description: {data.description}
              </Title>
            </Card>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

const titleStyle = StyleSheet.create({
  container: {
    color: '#ffffff',
    padding: 8,
    margin: 12,
    fontSize: 20,
  },
});

const cardStyle = StyleSheet.create({
  container: {
    backgroundColor: '#00aaff',
    padding: 12,
    margin: 8,
    fontSize: 20,
  },
});

export default Home;
