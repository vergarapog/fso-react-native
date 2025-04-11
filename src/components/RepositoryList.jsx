import { FlatList, View, StyleSheet, ActivityIndicator, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import theme from '../theme';
import { useNavigate } from 'react-router-native';
import { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { OrderBy, SORT_OPTIONS, SortBy } from '../models/repository';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

export const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const [sort, setSort] = useState('latest');
  const selectedSort = SORT_OPTIONS[sort];
  const { repositories, loading } = useRepositories(selectedSort);

  return <RepositoryListContainer repositories={repositories} loading={loading} sort={sort} setSort={setSort} />;
};

export const RepositoryListContainer = ({ repositories, loading, sort, setSort }) => {
  const navigate = useNavigate();

  const repositoryNodes = repositories
    ? repositories?.edges?.map((edge) => {
        return edge.node;
      })
    : [];

  // if (loading) {
  //   return <ActivityIndicator style={theme.styles.container} size="large" color={theme.colors.primary} />;
  // }

  return (
    <>
      <FlatList
        ListHeaderComponent={
          <RNPickerSelect
            textInputProps={{ pointerEvents: 'none' }}
            placeholder={{ label: 'Select an option...', value: undefined }}
            value={sort}
            onValueChange={(value) => {
              if (value) setSort(value);
            }}
            items={[
              { label: 'Latest Repositories', value: 'latest' },
              { label: 'Highest rated repositories', value: 'highest' },
              { label: 'Lowest rated repositories', value: 'lowest' },
            ]}
          />
        }
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        pointerEvents={loading ? 'none' : 'auto'}
        style={{ opacity: loading ? 0.7 : 1 }}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
            <RepositoryItem
              fullName={item.fullName}
              description={item.description}
              language={item.language}
              stargazersCount={item.stargazersCount}
              forksCount={item.forksCount}
              reviewCount={item.reviewCount}
              ratingAverage={item.ratingAverage}
              ownerAvatarUrl={item.ownerAvatarUrl}
              url={item.url}
            />
          </Pressable>
        )}
      />
    </>
  );
};

export default RepositoryList;
