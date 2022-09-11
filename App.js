import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TabBarIOSItem, Text, View } from 'react-native';
import Search from './screens/Search';
import Home from './screens/Home';
import Cities from './screens/Cities';

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <>
      <StatusBar style='dark-content' backgroundColor='#00aaff' />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color }) => {
              let iconName;
              route.name === 'search'
                ? (iconName = 'city')
                : (iconName = 'home-city-outline');

              // if (route.name === 'home') iconName = 'city';
              // if (route.name === 'search') iconName = 'home-city-outline';
              // if (route.name === 'cities') iconName = 'home-city-outline';

              return (
                <MaterialCommunityIcons
                  name={iconName}
                  color={color}
                  size={26}
                />
              );
            },
          })}
          tabBarOptions={{
            activeTintColor: 'black',
            inactiveTintColor: 'gray',
          }}
        >
          <Tab.Screen
            name='home'
            component={Home}
            initialParams={{ city: 'London' }}
          />
          <Tab.Screen name='search' component={Search} />
          <Tab.Screen name='cities' component={Cities} />
        </Tab.Navigator>
      </NavigationContainer>
      {/* <Home /> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
