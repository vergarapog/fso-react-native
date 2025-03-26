import { Pressable } from 'react-native';
import Text from './Text';
import { Link } from 'react-router-native';

const AppBarItem = ({ title, route, style, onPress }) => {
  return (
    <Pressable style={style}>
      <Link to={route} onPress={onPress}>
        <Text color="white" fontWeight="bold">
          {title}
        </Text>
      </Link>
    </Pressable>
  );
};

export default AppBarItem;
