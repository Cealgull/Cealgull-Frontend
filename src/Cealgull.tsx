import { HomeView } from "@src/View/HomeView";
import { PersonView } from "@src/View/PersonView";
import { PublishView } from "./View/PublishView";
import { TopicView } from "./View/TopicView";
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
          <Stack.Screen
            name="Home"
            options={{ headerShown: false }}
            component={HomeView}
          ></Stack.Screen>
          <Stack.Screen
            name="Person"
            options={{ headerShown: false }}
            component={PersonView}
          ></Stack.Screen>
          <Stack.Screen
            name="Publish"
            options={{ headerShown: false }}
            component={PublishView}
          ></Stack.Screen>
          <Stack.Screen
            name="Topic"
            options={{ headerShown: false }}
            component={TopicView}
          ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
