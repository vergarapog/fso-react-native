import { GET_REPOSITORIES } from '../graphql/queries';
import { useQuery } from '@apollo/client';

const useRepositories = (sort, searchKeyword) => {
  const {
    data: repositories,
    loading,
    refetch,
  } = useQuery(GET_REPOSITORIES, {
    variables: { orderBy: sort?.orderBy, orderDirection: sort?.orderDirection, searchKeyword: searchKeyword },
    fetchPolicy: 'cache-and-network',
  });

  return { repositories: repositories?.repositories, loading, refetch };
};

export default useRepositories;
