import React, { useState } from "react";
import SignupForm from "./SignupForm";
import useCreateUser from "../../hooks/useCreateUser";
import * as yup from "yup";
import { Formik } from "formik";
import { View, StyleSheet } from "react-native";
import Text from "../Text";
import { useHistory } from "react-router-dom";

const initialValues = {
  username: "",
  password: "",
  passwordConfirmation: "",
};

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null])
    .required("Password confirmation is required"),
});

const Signup = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignupForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignupContainer = () => {
  const history = useHistory();
  const [createUser, result] = useCreateUser();
  const [errorMessage, setErrorMessage] = useState(null);

  const formSubmitHandler = async (values) => {
    const { username, password, passwordConfirmation } = values;
    console.log("values", values);
    const showErrorMessage = (erroStr) => {
      setErrorMessage(erroStr);
      setTimeout(() => {
        setErrorMessage();
      }, 5000);
    };

    try {
        const { data, error, loading } = await createUser({
          username,
          password,
        });
        history.push('/signin');
    } catch (e) {
      console.log("error here", e.message);
      showErrorMessage(e.message);
    }
  };

  return (
    <View style={styles.reviewScreenContainer}>
      <View style={styles.reviewFormErrorMessageContainer}>
        {errorMessage && (
          <Text style={styles.errorMessageText}>{errorMessage}</Text>
        )}
      </View>
      <View style={styles.reviewEntryContainer}>
        <Signup onSubmit={formSubmitHandler} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  reviewScreenContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  reviewFormErrorMessageContainer: {
    flex: 0.2,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  errorMessageText: {
    color: "#ff1934",
    textDecorationLine: "underline",
  },
  reviewEntryContainer: {
    flex: 1,
  },
});

export default SignupContainer;
