import ReviewItem from '@/components/ReviewItem';
import Text from '@/components/Text';
import useCurrentUser from '@/hooks/useCurrentUser';
import theme from '@/theme';
import { FlatList, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    padding: 15,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

const MyReviews = () => {
  const { currentUser } = useCurrentUser({ includeReviews: true });

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={currentUser?.me?.reviews?.edges}
        renderItem={({ item }) => <ReviewItem item={{ user: { username: item.node.repository.fullName }, ...item.node }} />}
        ListHeaderComponent={
          <View style={styles.container}>
            <Text>My Reviews</Text>
          </View>
        }
      />
    </View>
  );
};

export default MyReviews;
