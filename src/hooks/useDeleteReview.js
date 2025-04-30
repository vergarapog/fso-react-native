import { useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../graphql/mutations';

const useDeleteReview = () => {
  const [deleteReview, result] = useMutation(DELETE_REVIEW);

  const remove = async (id) => {
    const { data } = await deleteReview({
      variables: {
        deleteReviewId: id,
      },
    });

    return data;
  };

  return [remove, result];
};

export default useDeleteReview;
