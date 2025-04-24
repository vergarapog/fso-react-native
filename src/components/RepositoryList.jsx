import { FlatList, View, StyleSheet, ActivityIndicator, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import theme from '../theme';
import { useNavigate } from 'react-router-native';
import React, { useEffect, useMemo, useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { OrderBy, SORT_OPTIONS, SortBy } from '../models/repository';
import { Searchbar } from 'react-native-paper';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  searchBar: {
    backgroundColor: '#fff',
    elevation: 0,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
  },
  input: {
    color: '#000',
  },
});

export const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sort, setSort] = useState('latest');
  const selectedSort = SORT_OPTIONS[sort];
  const { repositories, loading } = useRepositories(selectedSort, searchQuery);

  return (
    <RepositoryListContainer
      repositories={repositories}
      loading={loading}
      sort={sort}
      setSort={setSort}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
    />
  );
};

export const RepositoryListContainer = ({ repositories, loading, sort, setSort, searchQuery, setSearchQuery }) => {
  const [localSearch, setLocalSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchQuery(localSearch);
    }, 300);
    return () => clearTimeout(timeout);
  }, [localSearch]);

  const headerComponent = useMemo(
    () => (
      <View>
        <Searchbar style={styles.searchBar} inputStyle={styles.input} placeholder="Search" onChangeText={setLocalSearch} mode="view" />
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
      </View>
    ),
    [sort],
  );

  const repositoryNodes = repositories
    ? repositories?.edges?.map((edge) => {
        return edge.node;
      })
    : [];

  return (
    <>
      <FlatList
        ListHeaderComponent={headerComponent}
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        pointerEvents={loading ? 'none' : 'auto'}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
            <RepositoryItem {...item} />
          </Pressable>
        )}
      />
    </>
  );
};

export default RepositoryList;
