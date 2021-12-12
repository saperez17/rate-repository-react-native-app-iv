import { useMutation } from "@apollo/client";
import { USER_AUTHORIZATION } from "../graphql/mutations";
import useAuthStorage from "./useAuthStorage";
import { useApolloClient } from '@apollo/client';

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const client = useApolloClient();
  const [mutate, { loading, error }] = useMutation(USER_AUTHORIZATION);

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({
      variables: {
        username,
        password,
      },
    });
    if (!error && !loading){
        await authStorage.setAccessToken(data.authorize.accessToken);
        client.resetStore();
    }
    return { data, loading, error };
  };

  return [signIn];
};
export default useSignIn;
