import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import theme from '../theme';
import AppBarItem from './AppBarItem';

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
  return (
    <View>
      <ScrollView horizontal style={styles.container}>
        <AppBarItem title="Repositories" route="/" style={styles.item} />
        <AppBarItem title="Sign In" route="/sign-in" style={styles.item} />
      </ScrollView>
    </View>
  );
};

export default AppBar;
