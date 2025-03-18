import React from 'react';
import { View, ActivityIndicator, FlatList } from 'react-native';
import { useParams } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import theme from '../theme';
import useSingleRepository from '../hooks/useSingleRepository';
import Text from './Text';

const RepositoryInfo = ({ repository }) => {
  return (
    <View>
      <RepositoryItem {...repository} />
    </View>
  );
};

const ReviewItem = ({ item }) => {
  console.log(item);
  return (
    <View>
      <Text>ReviewItem</Text>
    </View>
  );
};

const RepositoryView = () => {
  const { id } = useParams();

  const { repository, loading } = useSingleRepository(id);

  console.log(repository?.reviews?.edges);

  if (loading) {
    return <ActivityIndicator style={theme.styles.container} size="large" color={theme.colors.primary} />;
  }

  return (
    <View>
      <FlatList
        data={repository?.reviews?.edges}
        renderItem={({ item }) => <ReviewItem item={item.node} />}
        ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      />
    </View>
  );
};

export default RepositoryView;
