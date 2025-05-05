import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import Constants from 'expo-constants';
import { setContext } from '@apollo/client/link/context';
import { relayStylePagination } from '@apollo/client/utilities';

const { env } = Constants.expoConfig.extra;

const httpLink = createHttpLink({
  uri: env,
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        repositories: relayStylePagination(),
      },
    },
  },
});

const createApolloClient = (authStorage) => {
  const authLink = setContext(async (_, { headers }) => {
    try {
      const accessToken = await authStorage.getAccessToken();
      return {
        headers: {
          ...headers,
          authorization: accessToken ? `Bearer ${accessToken}` : '',
        },
      };
    } catch (e) {
      console.log(e);
    }
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
  });

  // const authLink = setContext(async (_, { headers }) => {
  //   try {
  //     const accessToken = await authStorage.getAccessToken();
  //     return { headers: { ...headers, authorization: accessToken ? `Bearer ${accessToken}` : '' } };
  //   } catch (e) {
  //     console.log(e);
  //     return { headers };
  //   }
  // });
};

// const createApolloClient = () => {
//   return new ApolloClient({
//     uri: Constants.expoConfig.extra.env,
//     cache: new InMemoryCache(),
//   });
// };

export default createApolloClient;
