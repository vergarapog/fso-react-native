import React from 'react';
import { View, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { useParams } from 'react-router-native';
import RepositoryItem from '@/components/RepositoryItem';
import theme from '../theme';
import useSingleRepository from '../hooks/useSingleRepository';
import ReviewItem from '@/components/ReviewItem';

const RepositoryInfo = ({ repository }) => {
  return (
    <View>
      <RepositoryItem {...repository} />
    </View>
  );
};

const RepositoryView = () => {
  const { id } = useParams();

  const { repository, fetchMore, loading } = useSingleRepository({ first: 5, id });

  const onEndReach = () => {
    fetchMore();
  };

  if (loading) {
    return <ActivityIndicator style={theme.styles.container} size="large" color={theme.colors.primary} />;
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={repository?.reviews?.edges}
        renderItem={({ item }) => <ReviewItem item={item.node} />}
        ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default RepositoryView;
