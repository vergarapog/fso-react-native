import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from '../components/RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import React, { useMemo, useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { SORT_OPTIONS } from '../models/repository';
import { Searchbar } from 'react-native-paper';
import { useDebouncedCallback } from 'use-debounce';

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
  const { repositories, fetchMore, loading } = useRepositories({ first: 4, selectedSort, searchQuery });

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      loading={loading}
      sort={sort}
      setSort={setSort}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      onEndReach={onEndReach}
    />
  );
};

export const RepositoryListContainer = ({ repositories, loading, sort, setSort, searchQuery, setSearchQuery, onEndReach }) => {
  const navigate = useNavigate();

  const debounced = useDebouncedCallback((value) => {
    setSearchQuery(value);
  }, 300);

  const headerComponent = useMemo(
    () => (
      <View>
        <Searchbar style={styles.searchBar} inputStyle={styles.input} placeholder="Search" onChangeText={debounced} mode="view" />
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
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
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
