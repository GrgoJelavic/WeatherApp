import * as React from 'react';
import { Appbar, Title } from 'react-native-paper';
import { StyleSheet, View, Text } from 'react-native';

const Header = (props) => {
  return (
    <Appbar.Header
      style={styles.container}
      theme={{ colors: { primary: '#00aaff' } }}
    >
      <Title style={titleStyle.container}>{props.name} Weather</Title>
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const titleStyle = StyleSheet.create({
  container: {
    color: 'white',
  },
});

export default Header;
