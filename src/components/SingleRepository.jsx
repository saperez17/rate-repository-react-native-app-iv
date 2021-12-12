import React from "react";
import RepositoryItem from "./RepositoryItem";

import { FlatList } from "react-native";
import ReviewItem from "./ReviewItem";

const RepositoryInfo = ({ repository }) => {
  return <RepositoryItem item={repository} showLink={true} />;
};

const SingleRepository = ({ repository, reviews, onEndReach }) => {
  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} key={item.node.id} />}
      keyExtractor={({ id }) => id}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
      ListHeaderComponent={() => (
        <RepositoryInfo repository={repository} key={repository.id} />
      )}
    />
  );
};

export default SingleRepository;
