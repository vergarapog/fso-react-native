import { useMutation } from '@apollo/client';
import { LOGIN } from '../graphql/mutations';

import useAuthStorage from './useAuthStorage';

const useSignIn = () => {
  const authStorage = useAuthStorage();
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
