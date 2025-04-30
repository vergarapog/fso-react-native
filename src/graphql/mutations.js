import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation authenticate($credentials: AuthenticateInput!) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation createReview($review: CreateReviewInput) {
    createReview(review: $review) {
      id
      userId
      rating
      createdAt
      text
      repositoryId
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation deleteReview($deleteReviewId: ID!) {
    deleteReview(id: $deleteReviewId)
  }
`;

export const CREATE_USER = gql`
  mutation createUser($user: CreateUserInput) {
    createUser(user: $user) {
      id
      username
      createdAt
      reviewCount
    }
  }
`;
