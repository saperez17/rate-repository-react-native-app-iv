import React from 'react';
import AppBarTab from "./AppBarTab";
import { Pressable } from "react-native";
import useAuthStorage from "../hooks/useAuthStorage";
import { useApolloClient } from '@apollo/client';
import { useHistory } from 'react-router-dom';

const Signout = () => {
    const authStorage = useAuthStorage();
    const client = useApolloClient();
    const history = useHistory()

    const signOutclickHandler = async() => {
        await authStorage.removeAccessToken();
        client.resetStore();
        history.push('/')
    }
  return (
    <Pressable onPress={signOutclickHandler}>
      <AppBarTab>Sign out</AppBarTab>
    </Pressable>
  );
};

export default Signout;
