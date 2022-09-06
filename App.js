import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Search from './screens/Search';

export default function App() {
  return (
    <View style={styles.container}>
      <Search />
      <StatusBar style='auto' />
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
