import { StyleSheet, View } from 'react-native';
import RepositoryList from './components/RepositoryList';
import AppBar from './components/AppBar';
import theme from './theme';
import { Navigate, Route, Routes } from 'react-router-native';
import SignIn from './components/SignIn';
import RepositoryView from './components/RepositoryView';
import Review from './components/Review';

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
        <Route path="/review" element={<Review />} />
        <Route path="/repository/:id" element={<RepositoryView />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
