import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import RepositoryList from './components/RepositoryList';
import Text from './components/Text';
import AppBar from './components/AppBar';
import theme from './theme';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.mainBg,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <RepositoryList />
    </View>
  );
};

export default Main;
