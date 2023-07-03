import { HomeView } from "@src/View/HomeView";
import { PersonView } from "@src/View/PersonView";
import { PublishView } from "./View/PublishView";
import { RootStackParamList } from "@src/Resources/RootStackData";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator<RootStackParamList>();

export default function Cealgull() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeView}></Stack.Screen>
          <Stack.Screen name="Person" component={PersonView}></Stack.Screen>
          <Stack.Screen name="Publish" component={PublishView}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
