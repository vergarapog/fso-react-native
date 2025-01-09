import { StyleSheet, View } from 'react-native';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary,
    alignSelf: 'flex-start',
    padding: 5,
    borderRadius: 4,
  },
});

const Tag = ({ label }) => {
  return (
    <View style={styles.container}>
      <Text color="white">{label}</Text>
    </View>
  );
};

export default Tag;
