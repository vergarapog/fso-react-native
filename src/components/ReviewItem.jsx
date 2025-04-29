import { StyleSheet, View } from 'react-native';
import Text from './Text';
import theme from '@/theme';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    padding: 15,
    marginVertical: 20,
    display: 'flex',
    flexDirection: 'row',
  },
  scoreContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  titleContainer: {
    marginTop: 4,
    marginBottom: 4,
  },
});

const ReviewItem = ({ item, showButtons = false }) => {
  const navigate = useNavigate();

  console.log(item.repository);

  const { rating, user, text, createdAt } = item;
  return (
    <View style={styles.container}>
      <View style={styles.scoreContainer}>
        <Text>{rating}</Text>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text fontWeight="bold">{user.username}</Text>
          <Text>{format(createdAt, 'dd.MM.yyyy')}</Text>
        </View>
        <Text>{text}</Text>

        {showButtons && (
          <View style={{ marginTop: 10, flexDirection: 'row', gap: 10 }}>
            <Text onPress={() => navigate(`/repository/${item.repository.id}`)}>View Repository</Text>
            <Text>Delete Review</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default ReviewItem;
