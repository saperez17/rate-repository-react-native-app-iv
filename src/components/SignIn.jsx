import React from "react";
import FormikTextInput from "./FormikTextInput";
import { Formik } from "formik";
import { Pressable, View, StyleSheet } from "react-native";
import Text from "./Text";
import Constants from "expo-constants";
import Button from "./Button";
import useSignIn from "../hooks/useSignIn";
import * as yup from "yup";
import { useHistory } from "react-router-dom";

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const SigninForm = ({ onSubmit }) => {
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
      <View style={styles.submitWrapper}>
        <Button
          onPress={onSubmit}
          style={styles.submitButton}
          accessibilityRole="button"
        >
          <Text color="white" centered>
            Sign in
          </Text>
        </Button>
      </View>
    </View>
  );
};

export const SignIn = ({ onSubmit }) => {
 

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SigninForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SigninContainer = () => {
  const [signIn, result] = useSignIn();
  const history = useHistory();
  
  const formSubmitHandler = async (values) => {
    const username = values.username;
    const pass = values.password;

    try {
      const { data, error, loading } = await signIn({
        username,
        password: pass,
      });
      history.push("/");
    } catch (e) {
      console.log("error here", e);
    }
  };

  return <SignIn onSubmit={formSubmitHandler} />;
};

const styles = StyleSheet.create({
  formContainer: {
    height: 60,
  },
  formContainer: {
    height: "80%",
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

export default SigninContainer;
