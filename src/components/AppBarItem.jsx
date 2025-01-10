import { Pressable } from 'react-native';
import Text from './Text';
import { Link } from 'react-router-native';

const AppBarItem = ({ title, route }) => {
  return (
    <Pressable>
      <Link to={route}>
        <Text color="white">{title}</Text>
      </Link>
    </Pressable>
  );
};

export default AppBarItem;
