import { useMutation } from '@apollo/client';
import { LOGIN } from '../graphql/mutations';

const useSignIn = () => {
  const [login, result] = useMutation(LOGIN);

  const signIn = async ({ username, password }) => {
    const { data } = await login({
      variables: {
        credentials: {
          username,
          password,
        },
      },
    });

    return data;
  };

  return [signIn, result];
};

export default useSignIn;
