import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Homescreen from "./screens/Homescreen";
import Optionsscreen from "./screens/Optionsscreen";
import GameScreen from "./screens/GameScreen";
import CreateBoardScreen from "./screens/CreateBoardScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Homescreen}/>
        <Stack.Screen name="Options" component={Optionsscreen}/>
        <Stack.Screen name="Game" component={GameScreen}/>
        <Stack.Screen name="Create Board" component={CreateBoardScreen}/>
      </Stack.Navigator>
    </NavigationContainer>

  );
}
