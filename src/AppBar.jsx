import { View, StyleSheet, Pressable } from "react-native";
import Constants from "expo-constants";
import Text from "./Text";
import theme from "./theme";
import AppBarItem from "./AppBarItem";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 20,
    backgroundColor: theme.colors.appBarBg,
    paddingBottom: 20,
  },
  // ...
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarItem title="Repositories" />
    </View>
  );
};

export default AppBar;
