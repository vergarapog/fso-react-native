import { gql } from '@apollo/client';
import { PAGE_INFO_FIELDS, REPOSITORY_FIELDS, REVIEW_FIELDS } from './fragments';

export const GET_REPOSITORIES = gql`
  # query Repositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection) {
  # repositories(orderBy: $orderBy, orderDirection: $orderDirection) {
  query Repositories($after: String, $first: Int, $orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String) {
    repositories(after: $after, first: $first, orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
      edges {
        node {
          ...RepositoryFields
          reviews {
            totalCount

            edges {
              cursor
              node {
                ...ReviewFields
              }
            }
          }
        }
      }
      pageInfo {
        ...PageInfoFields
      }
    }
  }
  ${REPOSITORY_FIELDS}
  ${REVIEW_FIELDS}
  ${PAGE_INFO_FIELDS}
`;

export const GET_SINGLE_REPOSITORY = gql`
  query Repository($first: Int, $after: String, $repositoryId: ID!) {
    repository(id: $repositoryId) {
      ...RepositoryFields
      reviews(first: $first, after: $after) {
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
        pageInfo {
          ...PageInfoFields
        }
      }
    }
  }
  ${REPOSITORY_FIELDS}
  ${PAGE_INFO_FIELDS}
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
