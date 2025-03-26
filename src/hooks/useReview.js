import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';

const useReview = () => {
  const [createReview, result] = useMutation(CREATE_REVIEW);

  const review = async (review) => {
    const { data } = await createReview({
      variables: {
        review: review,
      },
    });

    return data;
  };

  return [review, result];
};

export default useReview;
