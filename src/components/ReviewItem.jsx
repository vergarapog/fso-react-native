import { Alert, StyleSheet, View } from 'react-native';
import Text from './Text';
import theme from '@/theme';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-native';
import useDeleteReview from '@/hooks/useDeleteReview';

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
  buttonContainer: {
    marginTop: 10,
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    color: theme.colors.white,
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  viewButton: { backgroundColor: theme.colors.primary },
  deleteButton: { backgroundColor: theme.colors.redError },
});

const ReviewItem = ({ item, showButtons = false, refetch }) => {
  const navigate = useNavigate();
  const [remove] = useDeleteReview();

  console.log(refetch);

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
          <View style={styles.buttonContainer}>
            <Text style={[styles.button, styles.viewButton]} onPress={() => navigate(`/repository/${item.repository.id}`)}>
              View Repository
            </Text>
            <Text
              style={[styles.button, styles.deleteButton]}
              onPress={() => {
                Alert.alert('Delete Review', 'Are you sure you want to delete this review?', [
                  { text: 'Cancel', style: 'cancel' },
                  {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                      try {
                        await remove(item.id);
                        refetch();
                      } catch (error) {
                        console.error('Error deleting review:', error);
                      }
                    },
                  },
                ]);
              }}
            >
              Delete Review
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default ReviewItem;
