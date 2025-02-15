import { GET_ME } from '../graphql/queries';
import { useQuery } from '@apollo/client';

const useCurrentUser = () => {
  const {
    data: currentUser,
    loading,
    refetch,
  } = useQuery(GET_ME, {
    fetchPolicy: 'cache-and-network',
  });

  return { currentUser, loading, refetch };
};

export default useCurrentUser;
