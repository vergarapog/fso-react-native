import { Pressable } from "react-native";
import Text from "./Text";

const AppBarItem = ({ title }) => {
  return (
    <Pressable>
      <Text color="white">{title}</Text>
    </Pressable>
  );
};

export default AppBarItem;
