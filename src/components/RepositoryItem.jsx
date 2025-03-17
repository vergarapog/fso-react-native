import React from 'react';
import { View, StyleSheet, Image, Pressable, Linking } from 'react-native';
import theme from '../theme';
import Text from './Text';
import Tag from './Tag';
import { suffixK } from '../helpers';
import { useLocation } from 'react-router-native';

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
    gap: 5,
    flexShrink: 1,
    marginLeft: 20,
  },
  avatarIcon: {
    height: 40,
    width: 40,
  },
  footer: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingInline: 20,
  },
  itemFooter: {
    display: 'flex',
    gap: 7,
    alignItems: 'center',
  },
  linkButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 10,
    width: 'full',
    color: theme.colors.white,
    backgroundColor: theme.colors.primary,
  },
  linkButtonText: {
    color: theme.colors.white,
  },
});

const RepositoryItem = ({ fullName, description, language, stargazersCount, forksCount, reviewCount, ratingAverage, ownerAvatarUrl, url }) => {
  const location = useLocation();
  const isSingleView = location.pathname.includes('/repository/');

  const openURL = () => {
    Linking.openURL(url);
  };

  return (
    <View testID="repositoryItem" style={styles.container}>
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
          <Tag label={language} />
        </View>
      </View>
      <View style={styles.footer}>
        <ItemFooter label="Stars" value={stargazersCount} />
        <ItemFooter label="Forks" value={forksCount} />
        <ItemFooter label="Reviews" value={reviewCount} />
        <ItemFooter label="Rating" value={ratingAverage} />
      </View>
      {isSingleView && (
        <Pressable style={styles.linkButton} onPress={openURL}>
          <Text style={styles.linkButtonText}>Open in Github</Text>
        </Pressable>
      )}
    </View>
  );
};

const ItemFooter = ({ label, value }) => {
  return (
    <View style={styles.itemFooter}>
      <Text fontWeight="bold">{suffixK(value)}</Text>
      <Text>{label}</Text>
    </View>
  );
};

export default RepositoryItem;
