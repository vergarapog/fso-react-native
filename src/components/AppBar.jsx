import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarItem from './AppBarItem';
import useLogout from '../hooks/useLogout';
import useCurrentUser from '../hooks/useCurrentUser';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    // gap: 7,
    paddingTop: Constants.statusBarHeight + 20,
    backgroundColor: theme.colors.appBarBg,
    paddingBottom: 20,
    paddingInline: 20,
  },
  item: {
    marginRight: 7,
  },
});

const AppBar = () => {
  const [logout] = useLogout();
  const { currentUser } = useCurrentUser();

  return (
    <View>
      <ScrollView horizontal style={styles.container}>
        <AppBarItem title="Repositories" route="/" style={styles.item} />
        {currentUser?.me ? (
          <AppBarItem title="Sign Out" onPress={logout} style={styles.item} />
        ) : (
          <AppBarItem title="Sign In" route="/sign-in" style={styles.item} />
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
