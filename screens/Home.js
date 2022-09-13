import React, { useState, useEffect } from 'react';
import { Card, Title } from 'react-native-paper';
import { Image, StyleSheet, View } from 'react-native';
import Header from './Header';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = (props) => {
  const { city } = props.route.params;
  const [data, setData] = useState({
    name: city,
    description: 'fetching weather description',
    temperature: 'fetching air temperature',
    pressure: 'fetching air pressure',
    humidity: 'fetching air humidity',
    wind: 'fetching wind speed',
    icon: 'getting weather icon',
  });

  useEffect(() => {
    fetchWeather();
  }, [city]);

  const appid = 'bab0eced610dc6fe6d14fd460fa5b2de';
  let myCity, currentCity;

  const fetchWeather = async () => {
    currentCity = await AsyncStorage.getItem('currentCity');
    props.route.params.city === 'London'
      ? (myCity = currentCity)
      : (myCity = city);
    if (!myCity) myCity = 'London';

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${myCity}&appid=${appid}`
    )
      .then((data) => data.json())
      .then((result) => {
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
    city = myCity;
  };

  return (
    <>
      <View>
        <Header name='The' />
        <Title style={titleStyle.container}>{`${data.name}`}</Title>
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
      </View>
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
