import React, { useState } from "react";
import ReviewForm from "./ReviewForm";
import useCreateReview from "../../hooks/useCreateReview";
import * as yup from "yup";
import { Formik } from "formik";
import { View, StyleSheet } from "react-native";
import Text from "../Text";
import { useHistory } from "react-router-dom";

const initialValues = {
  repositoryOwnerName: "",
  repositoryName: "",
  repositoryRating: 0,
  repositoryReview: "",
};

const validationSchema = yup.object().shape({
  repositoryOwnerName: yup
    .string()
    .required("Repository owner name is required"),
  repositoryName: yup.string().required("Repository name is required"),
  repositoryRating: yup.string().min(0).max(100).required("Rating is required"),
  repositoryReview: yup.string(),
});

const ReviewEntry = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const ReviewEntryContainer = () => {
  const history = useHistory();
  const [createReview, result] = useCreateReview();
  const [errorMessage, setErrorMessage] = useState(null);

  const formSubmitHandler = async (values) => {
    const {
      repositoryName,
      repositoryOwnerName,
      repositoryRating,
      repositoryReview,
    } = values;

    const showErrorMessage = (erroStr) => {
      setErrorMessage(erroStr);
      setTimeout(() => {
        setErrorMessage();
      }, 5000);
    };

    try {
      const { data, error, loading } = await createReview({
        repositoryName,
        repositoryOwnerName,
        repositoryRating: parseInt(repositoryRating),
        repositoryReview,
      });
          history.push(`repository/${data.createReview.repository.id}`);
    } catch (e) {
      console.log("error here", e.message);
      showErrorMessage(e.message)
    }
  };

  return (
    <View style={styles.reviewScreenContainer}>
      <View style={styles.reviewFormErrorMessageContainer}>
        {errorMessage && <Text style={styles.errorMessageText}>{errorMessage}</Text>}
      </View>
      <View style={styles.reviewEntryContainer}>
        <ReviewEntry onSubmit={formSubmitHandler} />
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
    color: '#ff1934',
    textDecorationLine: 'underline',
  },
  reviewEntryContainer: {
    flex: 1,
  },
  
});

export default ReviewEntryContainer;
