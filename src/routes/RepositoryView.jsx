import React from 'react';
import { View, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { useParams } from 'react-router-native';
import RepositoryItem from '@/components/RepositoryItem';
import theme from '../theme';
import useSingleRepository from '../hooks/useSingleRepository';
import Text from '@/components/Text';
import { format } from 'date-fns';

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

const RepositoryInfo = ({ repository }) => {
  return (
    <View>
      <RepositoryItem {...repository} />
    </View>
  );
};

const ReviewItem = ({ item }) => {
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
      </View>
    </View>
  );
};

const RepositoryView = () => {
  const { id } = useParams();

  const { repository, loading } = useSingleRepository(id);

  if (loading) {
    return <ActivityIndicator style={theme.styles.container} size="large" color={theme.colors.primary} />;
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={repository?.reviews?.edges}
        renderItem={({ item }) => <ReviewItem item={item.node} />}
        ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      />
    </View>
  );
};

export default RepositoryView;
