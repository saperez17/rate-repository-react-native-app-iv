import React from "react";
import { View, StyleSheet } from "react-native";
import Text from "../Text";
import FormikTextInput from "../FormikTextInput";
import Button from "../Button";

const ReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.formContainer}>
      <View>
        <FormikTextInput
          name="repositoryOwnerName"
          placeholder="Repository owner name"
        />
      </View>
      <View style={styles.marginTop}>
        <FormikTextInput name="repositoryName" placeholder="Repository name" />
      </View>
      <View style={styles.marginTop}>
        <FormikTextInput
          name="repositoryRating"
          placeholder="Rating between 0 and 100"
        />
      </View>
      <View style={styles.marginTop}>
        <FormikTextInput name="repositoryReview" placeholder="Review" />
      </View>
      <View style={styles.submitWrapper}>
        <Button
          onPress={onSubmit}
          style={styles.submitButton}
          accessibilityRole="button"
        >
          <Text color="white" centered>
            Create a review
          </Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    // height: "80%",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },
  marginTop: {
    marginTop: 5,
  },
  submitWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  submitButton: {
    width: "50%",
    paddingTop: 10,
    paddingBottom: 10,
  },
});

export default ReviewForm;
