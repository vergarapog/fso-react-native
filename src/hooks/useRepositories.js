import { GET_REPOSITORIES } from '../graphql/queries';
import { useQuery } from '@apollo/client';

const useRepositories = (variables) => {
  const { first, sort, searchKeyword } = variables;
  const {
    data: repositories,
    loading,
    fetchMore,
    refetch,
  } = useQuery(GET_REPOSITORIES, {
    variables: { first: first, orderBy: sort?.orderBy, orderDirection: sort?.orderDirection, searchKeyword: searchKeyword },
    fetchPolicy: 'cache-and-network',
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && repositories?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: repositories.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return { repositories: repositories?.repositories, fetchMore: handleFetchMore, loading, refetch };
};

export default useRepositories;
