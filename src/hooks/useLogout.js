import { useApolloClient } from '@apollo/client';
import useAuthStorage from './useAuthStorage';
import { useNavigate } from 'react-router-native';

const useLogout = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const logout = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    navigate('/');
  };

  return [logout];
};

export default useLogout;
