import { StyleSheet, View } from 'react-native';
import RepositoryList from './routes/RepositoryList';
import AppBar from './components/AppBar';
import theme from './theme';
import { Navigate, Route, Routes } from 'react-router-native';
import SignIn from './routes/SignIn';
import RepositoryView from './routes/RepositoryView';
import Review from './routes/Review';
import SignUp from './routes/SignUp';
import MyReviews from './routes/MyReviews';

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
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/review" element={<Review />} />
        <Route path="/myreviews" element={<MyReviews />} />
        <Route path="/repository/:id" element={<RepositoryView />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
