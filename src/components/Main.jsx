import React from "react";
import { StyleSheet, View } from "react-native";
import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import SigninContainer from "./SignIn";
import { Route, Switch } from "react-router-native";
import RepositoryItemScreen from "./RepositoryItemScreen";
import ReviewEntryScreen from "./ReviewEntryScreen";
import SignupContainer from './Signup';
import UserReviewsScreen from "./UserReviewsScreen";
import { useApolloClient } from '@apollo/client';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: "#e1e4e8",
  },
});

const Main = () => {
  // const client = useApolloClient();
  // client.resetStore();
  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route path="/signin" exact>
          <SigninContainer />
        </Route>
        <Route path="/signup">
          <SignupContainer />
        </Route>
        <Route path="/repository/:id">
          <RepositoryItemScreen />
        </Route>
        <Route path="/user-reviews">
          <UserReviewsScreen />
        </Route>
        <Route path="/create-review">
          <ReviewEntryScreen />
        </Route>
        <Route path="/" exact>
          <RepositoryList />
        </Route>
      </Switch>
    </View>
  );
};

export default Main;
