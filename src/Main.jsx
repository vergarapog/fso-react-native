import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import RepositoryList from './components/RepositoryList';
import Text from './components/Text';
import AppBar from './components/AppBar';
import theme from './theme';
import { Navigate, Route, Routes } from 'react-router-native';
import SignIn from './components/SignIn';

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
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
