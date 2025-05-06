import { useQuery } from '@apollo/client';
import { GET_SINGLE_REPOSITORY } from '../graphql/queries';

const useSingleRepository = (variables) => {
  const { first, id } = variables;
  const { data, fetchMore, loading } = useQuery(GET_SINGLE_REPOSITORY, {
    variables: { first, repositoryId: id },
    fetchPolicy: 'cache-and-network',
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return { repository: data?.repository, fetchMore: handleFetchMore, loading };
};

export default useSingleRepository;
