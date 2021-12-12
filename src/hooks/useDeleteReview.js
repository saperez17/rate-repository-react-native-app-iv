import { useMutation } from "@apollo/client";
import { DELETE_REVIEW } from "../graphql/mutations";
import { AUTHORIZED_USER } from "../graphql/queries";

const useDeleteReview = () => {
  const [mutate, { loading, error }] = useMutation(DELETE_REVIEW);

  const deleteReview = async ({ id }) => {
    const { data } = await mutate({
      variables: {
        id,
      },
      refetchQueries: [AUTHORIZED_USER],
    });

    return { data, loading, error };
  };

  return [deleteReview];
};
export default useDeleteReview;
