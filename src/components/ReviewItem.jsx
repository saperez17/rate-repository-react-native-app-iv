import React from "react";
import Text from "./Text";
import { View, StyleSheet, Alert } from "react-native";
import { Button } from "react-native-paper";
import theme from "../theme";
import { format } from "date-fns";
import { useHistory } from "react-router-dom";
import useDeleteReview from "../hooks/useDeleteReview";

const ReviewItem = ({ review, isAuthorizedUser = false }) => {
  const history = useHistory();
  const [deleteReview] = useDeleteReview();

  const handleDeleteReview = () => {
    const { data, loading, error } = deleteReview({ id: review.node.id });
  };

  const confirmationAlert = () =>
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review",
      [
        {
          text: "CANCEL",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "DELETE", onPress: () => handleDeleteReview() },
      ]
    );

  return (
    <View style={styles.reviewItemContainer}>
      <View style={styles.reviewRating}>
        <Text style={styles.ratingText}>{review.node.rating}</Text>
      </View>
      <View style={styles.reviewItemDescriptionColumn}>
        <View>
          <Text fontWeight="bold">{review.node.user.username}</Text>
          <Text mt={3} color="whiteShadow1">
            {format(new Date(review.node.createdAt), "MM.dd.yyyy")}
          </Text>
        </View>

        <View>
          <Text style={styles.reviewBody}>{review.node.text}</Text>
        </View>
        {isAuthorizedUser && (
          <View style={styles.reviewActionsContainer}>
            <Button
              compact={true}
              uppercase={false}
              mode="contained"
              color="#c42021"
              style={styles.actionButton}
              onPress={() =>
                history.push(`repository/${review.node.repository.id}`)
              }
            >
              View repository
            </Button>
            <Button
              compact={true}
              uppercase={false}
              mode="contained"
              color="#3772ff"
              onPress={confirmationAlert}
            >
              Delete review
            </Button>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  reviewItemContainer: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: theme.colors.white,
    marginTop: 8,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 15,
    paddingRight: 50,
  },
  reviewItemDescriptionColumn: {
    display: "flex",
  },
  reviewRating: {
    marginRight: 5,
    width: 30,
    height: 30,
    borderRadius: 15,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: theme.colors.primary,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  ratingText: {
    color: theme.colors.primary,
  },
  reviewHeaderContainer: {
    display: "flex",
    flexDirection: "column",
  },
  reviewBody: {
    paddingTop: 5,
  },
  reviewActionsContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 8,
    marginBottom: 8,
  },
  actionButton: {
    marginRight: 5,
  },
});

export default ReviewItem;
