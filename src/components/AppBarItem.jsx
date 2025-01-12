import { Pressable } from 'react-native';
import Text from './Text';
import { Link } from 'react-router-native';

const AppBarItem = ({ title, route, style }) => {
  return (
    <Pressable style={style}>
      <Link to={route}>
        <Text color="white">{title}</Text>
      </Link>
    </Pressable>
  );
};

export default AppBarItem;
