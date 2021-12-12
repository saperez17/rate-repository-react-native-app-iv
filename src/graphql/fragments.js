import { gql } from "@apollo/client";

export const REPOSITORY_FIELDS = gql`
  fragment RepositoryFields on Repository {
    __typename
    id
    fullName
    description
    language
    forksCount
    stargazersCount
    ratingAverage
    reviewCount
    ownerAvatarUrl
    url
    ownerName
  }
`;

export const REPOSITORY_FIELDS_WITH_REVIEWS = gql`
  fragment RepositoryFieldsWithReviews on Repository {
    __typename
    id
    fullName
    description
    language
    forksCount
    stargazersCount
    ratingAverage
    reviewCount
    ownerAvatarUrl
    url
    ownerName
  }
`;

export const PAGE_INFO_FIELDS = gql`
  fragment PageInfoFields on PageInfo {
    endCursor
    hasNextPage
    hasPreviousPage
    startCursor
  }
`;
