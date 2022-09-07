import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Search from './screens/Search';
import Home from './screens/Home';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style='auto' />

      {/* <Search /> */}
      <Home />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00aaff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
