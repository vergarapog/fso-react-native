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
