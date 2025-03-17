import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useParams } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import theme from '../theme';
import useSingleRepository from '../hooks/useSingleRepository';

const RepositoryView = () => {
  const { id } = useParams();

  const { repository, loading } = useSingleRepository(id);

  if (loading) {
    return <ActivityIndicator style={theme.styles.container} size="large" color={theme.colors.primary} />;
  }

  return (
    <View>
      <RepositoryItem {...repository} />
    </View>
  );
};

export default RepositoryView;
