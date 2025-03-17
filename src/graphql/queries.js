import { gql } from '@apollo/client';
import { PAGE_INFO_FIELDS, REPOSITORY_FIELDS, REVIEW_FIELDS } from './fragments';

export const GET_REPOSITORIES = gql`
  query Repositories {
    repositories {
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
    }
  }
  ${REPOSITORY_FIELDS}
`;

export const GET_ME = gql`
  query Me {
    me {
      id
      username
      createdAt
      reviewCount
    }
  }
`;
