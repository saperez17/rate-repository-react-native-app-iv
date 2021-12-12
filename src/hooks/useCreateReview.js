import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";

const useCreateReview = () => {
  const [mutate, { loading, error }] = useMutation(CREATE_REVIEW);

  const createReview = async ({ repositoryName, repositoryOwnerName, repositoryRating, repositoryReview }) => {
    const { data } = await mutate({
      variables: {
        repositoryName,
        ownerName: repositoryOwnerName,
        rating: repositoryRating,
        text: repositoryReview
      },
    });

    return { data, loading, error };
  };

  return [createReview];
};
export default useCreateReview;
