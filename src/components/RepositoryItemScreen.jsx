import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import RepositoryItem from "./RepositoryItem";
import {
  useRepositoriesWithQuery,
  useRepository,
} from "../hooks/useRepositories";
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Text,
  View,
  Pressable,
} from "react-native";
import SingleRepository from "./SingleRepository";

const RepositoryItemScreen = () => {
  const { id } = useParams();
  const { data, loading } = useRepositoriesWithQuery();
  const {
    getRepository,
    handleFetchMoreReviews,
    data: repositoryData,
    loading: repositoryLoading,
  } = useRepository({ first: 5 });
  let searchItem;

  const onEndReach = () => {
    // console.log("You have reached the end of the list");
    handleFetchMoreReviews({ ownerName: searchItem.node.ownerName });
  };

  useEffect(() => {
    if (!loading && data) {
      searchItem = data.repositories.edges.find((edge) => edge.node.id == id);
      getRepository({
        variables: { ownerName: searchItem.node.ownerName, first: 5 },
      });
    }
  }, [data, loading]);

  if (repositoryData == undefined) return <Text>Loading ...</Text>;
  searchItem = repositoryData.repositories.edges.find(
    (edge) => edge.node.id == id
  );

  return (
    <SafeAreaView style={styles.container}>
      <SingleRepository
        onEndReach={onEndReach}
        repository={!searchItem ? {} : searchItem.node}
        reviews={
          !repositoryData
            ? []
            : repositoryData.repositories.edges[0].node.reviews.edges
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
});

export default RepositoryItemScreen;
