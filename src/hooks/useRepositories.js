import { useState, useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import {
  GET_REPOSITORIES,
  GET_REPOSITORY_WITH_REVIEWS,
} from "../graphql/queries";

const useRepositories = () => {
  const [repositories, setRepositories] = useState();
  const [loading, setLoading] = useState(false);

  const fetchRepositories = async () => {
    setLoading(true);

    // Replace the IP address part with your own IP address!
    const response = await fetch("http://192.168.0.5:5000/api/repositories");
    const json = await response.json();
    setLoading(false);
    setRepositories(json);
  };

  useEffect(() => {
    fetchRepositories();
  }, []);

  return { repositories, loading, refetch: fetchRepositories };
};

export const useRepositoriesWithQuery = (paginationArgs) => {
  const [repositories, setRepositories] = useState();

  const { data, loading, refetch, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    variables: {
      orderDirection: "DESC",
      orderBy: "CREATED_AT",
      searchKeyword: "",
      ...paginationArgs
    },
    fetchPolicy: "cache-and-network",
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...paginationArgs,
      },
    });
  };

  return { data, refetch, fetchMore: handleFetchMore, loading, ...result };
};

export const useRepository = (paginationArgs) => {
  const [repositories, setRepositories] = useState();

  const [getRepository, { loading, error, data, fetchMore }] = useLazyQuery(
    GET_REPOSITORY_WITH_REVIEWS,
    {
      fetchPolicy: "cache-and-network",
      variables: {
        ...paginationArgs
      }
    }
  );

  const handleFetchMoreReviews = (ownerName) => {
    const canFetchMore = !loading && data?.repositories.edges[0].node.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      
      return;
    }
    console.log('...paginationArgs', paginationArgs)
    fetchMore({
      variables: {
        after: data.repositories.edges[0].node.reviews.pageInfo.endCursor,
        ...paginationArgs,
        ...ownerName
      },
    });
  };

  return { getRepository, handleFetchMoreReviews, data, loading, error };
};

export default useRepositories;
