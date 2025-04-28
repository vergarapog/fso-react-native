import { GET_ME } from '../graphql/queries';
import { useQuery } from '@apollo/client';

const useCurrentUser = ({ includeReviews = false } = {}) => {
  const {
    data: currentUser,
    loading,
    refetch,
  } = useQuery(GET_ME, {
    variables: { includeReviews },
    fetchPolicy: 'cache-and-network',
  });

  return { currentUser, loading, refetch };
};

export default useCurrentUser;
