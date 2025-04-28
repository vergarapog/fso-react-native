import { gql } from '@apollo/client';
import { PAGE_INFO_FIELDS, REPOSITORY_FIELDS, REVIEW_FIELDS } from './fragments';

export const GET_REPOSITORIES = gql`
  # query Repositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection) {
  # repositories(orderBy: $orderBy, orderDirection: $orderDirection) {
  query Repositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
      edges {
        node {
          ...RepositoryFields
          reviews {
            totalCount
            pageInfo {
              ...PageInfoFields
            }
            edges {
              cursor
              node {
                ...ReviewFields
              }
            }
          }
        }
      }
    }
  }
  ${REPOSITORY_FIELDS}
  ${REVIEW_FIELDS}
  ${PAGE_INFO_FIELDS}
`;

export const GET_SINGLE_REPOSITORY = gql`
  query Repository($repositoryId: ID!) {
    repository(id: $repositoryId) {
      ...RepositoryFields
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
  ${REPOSITORY_FIELDS}
`;

export const GET_ME = gql`
  query Me($includeReviews: Boolean = false) {
    me {
      id
      username
      createdAt
      reviewCount
      reviews @include(if: $includeReviews) {
        edges {
          node {
            ...ReviewFields
          }
        }
      }
    }
  }
  ${REPOSITORY_FIELDS}
  ${REVIEW_FIELDS}
`;
