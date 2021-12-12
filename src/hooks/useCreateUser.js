import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";

const useCreateUser = () => {
  const [mutate, { loading, error }] = useMutation(CREATE_USER);

  const createUser = async ({ username, password }) => {
    const { data } = await mutate({
      variables: {
        username,
        password
      },
    });

    return { data, loading, error };
  };

  return [createUser];
};
export default useCreateUser;
