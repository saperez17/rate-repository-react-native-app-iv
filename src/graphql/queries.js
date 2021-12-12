import { gql } from "@apollo/client";
import { REPOSITORY_FIELDS, REPOSITORY_FIELDS_WITH_REVIEWS } from "./fragments";

export const GET_REPOSITORIES = gql`
  query getRepositories(
    $orderDirection: OrderDirection
    $orderBy: AllRepositoriesOrderBy
    $searchKeyword: String
    $after: String
    $first: Int
  ) {
    repositories(
      orderDirection: $orderDirection
      orderBy: $orderBy
      searchKeyword: $searchKeyword
      after: $after
      first: $first
    ) {
      __typename
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          ...RepositoryFields
        }
      }
    }
  }
  ${REPOSITORY_FIELDS}
`;

export const GET_REPOSITORY_WITH_REVIEWS = gql`
  query repositories($ownerName: String!, $after: String, $first: Int) {
    repositories(ownerName: $ownerName) {
      __typename
      edges {
        cursor
        node {
          ...RepositoryFieldsWithReviews
          reviews(after: $after, first: $first) {
            pageInfo {
              hasPreviousPage
              hasNextPage
              startCursor
              endCursor
            }
            edges {
              node {
                id
                user {
                  id
                  username
                }
                rating
                createdAt
                text
              }
            }
          }
        }
      }
    }
  }
  ${REPOSITORY_FIELDS_WITH_REVIEWS}
`;

export const AUTHORIZED_USER = gql`
  query authorizedUser($includeReviews: Boolean = false) {
    authorizedUser {
      id
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            user {
              id
              username
            }
            rating
            createdAt
            text
            repository {
              id
            }
          }
          cursor
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          startCursor
          endCursor
        }
      }
    }
  }
`;
