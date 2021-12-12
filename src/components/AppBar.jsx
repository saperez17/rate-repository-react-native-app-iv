import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import theme from "../theme";
import AppBarTab from "./AppBarTab";
import { Link } from "react-router-native";
import { AUTHORIZED_USER } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import Signout from "./Signout";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    // justifyContent: 'flex-end',
    height: Constants.statusBarHeight * 4,
    backgroundColor: theme.colors.backgroundDark,
  },
  // ...
});

const AppBar = () => {
  const { loading, error, data } = useQuery(AUTHORIZED_USER);

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/">
          <AppBarTab>Repositories</AppBarTab>
        </Link>
        {!data || !data?.authorizedUser ? (
          <>
            <Link to="/signin">
              <AppBarTab>Sign in</AppBarTab>
            </Link>
            <Link to="/signup">
              <AppBarTab>Sign up</AppBarTab>
            </Link>
          </>
        ) : (
          <>
            <Link to="/create-review">
              <AppBarTab>Create a review</AppBarTab>
            </Link>
            <Link to="/user-reviews">
              <AppBarTab>My reviews</AppBarTab>
            </Link>
            <Signout>Sign out</Signout>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
