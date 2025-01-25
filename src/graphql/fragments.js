import { gql } from '@apollo/client';

export const REPOSITORY_FIELDS = gql`
  fragment RepositoryFields on Repository {
    id
    ownerName
    name
    createdAt
    fullName
    ratingAverage
    reviewCount
    stargazersCount
    watchersCount
    forksCount
    openIssuesCount
    url
    ownerAvatarUrl
    description
    language
    userHasReviewed
  }
`;

export const REVIEW_FIELDS = gql`
  fragment ReviewFields on Review {
    id
    userId
    repositoryId
    rating
    createdAt
    text
    repository {
      ...RepositoryFields
    }
  }
`;

export const PAGE_INFO_FIELDS = gql`
  fragment PageInfoFields on PageInfo {
    hasPreviousPage
    hasNextPage
    startCursor
    endCursor
  }
`;
