import { GET_REPOSITORIES } from '../graphql/queries';
import { useQuery } from '@apollo/client';

const useRepositories = () => {
  const {
    data: repositories,
    loading,
    refetch,
  } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });

  return { repositories: repositories?.repositories, loading, refetch };
};

export default useRepositories;
