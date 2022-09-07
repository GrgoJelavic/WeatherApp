import React, { useState, useEffect } from 'react';
import { Card, Button, TextInput, Title } from 'react-native-paper';
import { Image, StyleSheet, View, Text, FlatList } from 'react-native';
import Header from './Header';
import icon from 'react-native-vector-icons/Ionicons';

const Home = () => {
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

  const city = 'split';
  const appid = '5d1df07e4fe52eeb11ce54e761a61d70';

  const fetchWeather = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appid}`
    )
      .then((data) => data.json())
      .then((result) => {
        // console.log(result.weather[0].icon);
        // console.log(result.main.temp);
        // console.log(result.weather[0].description);

        setData({
          name: result.name,
          description: result.weather[0].description,
          temperature: result.main.temp,
          pressure: result.main.pressure,
          humidity: result.main.humidity,
          wind: result.wind.speed,
          icon: result.weather[0].icon,
        });
      });
  };

  return (
    <>
      <View>
        <Header name='The' />
        <Title style={titleStyle.container}>{data.name}</Title>
        <Image
          style={{ width: 200, height: 200 }}
          source={{ uri: `https://openweathermap.org/img/w/${data.icon}.png` }}
        ></Image>
      </View>
      <Card>
        <Title style={cardStyle.container}>
          air temperature: {data.temperature}
        </Title>
      </Card>
      <Card>
        <Title style={cardStyle.container}>air pressure: {data.pressure}</Title>
      </Card>
      <Card>
        <Title style={cardStyle.container}>air humidity: {data.humidity}</Title>
      </Card>
      <Card>
        <Title style={cardStyle.container}>wind speed: {data.wind}</Title>
      </Card>
      <Card>
        <Title style={cardStyle.container}>
          weather description: {data.description}
        </Title>
      </Card>
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
