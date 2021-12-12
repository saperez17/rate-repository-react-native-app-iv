import React from "react";
import Text from "../Text";
import { View, FlatList } from "react-native";
import { useQuery } from "@apollo/client";
import { AUTHORIZED_USER } from "../../graphql/queries";
import ReviewItem from "../ReviewItem";

const UserReviewsScreenContainer = () => {
  const { loading, error, data } = useQuery(AUTHORIZED_USER, {
    variables: {
      includeReviews: true,
    },
  });

  if (loading)
    return (
      <View>
        <Text>...loading</Text>
      </View>
    );

  return (
    <FlatList
      data={data?.authorizedUser.reviews.edges}
      renderItem={({ item }) => <ReviewItem review={item} key={item.node.id} isAuthorizedUser={true}/>}
      keyExtractor={({ id }) => id}
    />
  );
};

export default UserReviewsScreenContainer;
