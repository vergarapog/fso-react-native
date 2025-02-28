import { FlatList, View, StyleSheet, ActivityIndicator } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

export const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, loading }) => {
  const repositoryNodes = repositories
    ? repositories?.edges?.map((edge) => {
        return edge.node;
      })
    : [];

  if (loading) {
    return <ActivityIndicator style={theme.styles.container} size="large" color={theme.colors.primary} />;
  }

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <RepositoryItem
          fullName={item.fullName}
          description={item.description}
          language={item.language}
          stargazersCount={item.stargazersCount}
          forksCount={item.forksCount}
          reviewCount={item.reviewCount}
          ratingAverage={item.ratingAverage}
          ownerAvatarUrl={item.ownerAvatarUrl}
        />
      )}
    />
  );
};

const RepositoryList = () => {
  const { repositories, loading } = useRepositories();

  return <RepositoryListContainer repositories={repositories} loading={loading} />;
};

export default RepositoryList;
