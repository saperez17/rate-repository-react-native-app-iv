import React from "react";
import { View, StyleSheet } from "react-native";
import Text from "../Text";
import FormikTextInput from "../FormikTextInput";
import Button from "../Button";

const SignupForm = ({ onSubmit }) => {
  return (
    <View style={styles.formContainer}>
      <View>
        <FormikTextInput name="username" placeholder="Username" />
      </View>
      <View style={styles.marginTop}>
        <FormikTextInput
          name="password"
          placeholder="Password"
          secureTextEntry
        />
      </View>
      <View style={styles.marginTop}>
        <FormikTextInput
          name="passwordConfirmation"
          placeholder="Password confirmation"
          secureTextEntry
        />
      </View>
      <View style={styles.submitWrapper}>
        <Button
          onPress={onSubmit}
          style={styles.submitButton}
          accessibilityRole="button"
        >
          <Text color="white" centered>
            Sign up
          </Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
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

export default SignupForm;
