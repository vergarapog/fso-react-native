import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import theme from './theme';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    padding: 20,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
  },
  headerCol: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    flexShrink: 1,
    marginLeft: 10,
  },
  avatarIcon: {
    height: 50,
    width: 50,
  },
});

const RepositoryItem = ({ fullName, description, language, stargazersCount, forksCount, reviewCount, ratingAverage, ownerAvatarUrl }) => (
  <View style={styles.container}>
    <View style={styles.header}>
      <Image
        style={styles.avatarIcon}
        source={{
          uri: ownerAvatarUrl,
        }}
      />
      <View style={styles.headerCol}>
        <Text fontWeight="bold">{fullName}</Text>
        {description && <Text>{description}</Text>}
        <Text>{language}</Text>
      </View>
    </View>
    <Text>Stars: {stargazersCount}</Text>
    <Text>Forks: {forksCount}</Text>
    <Text>Reviews: {reviewCount}</Text>
    <Text>Rating: {ratingAverage}</Text>
  </View>
);

export default RepositoryItem;
