import { RootTabParamList } from "@src/@types/navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  HomeScreen,
  PersonScreen,
  PublishScreen,
  TopicScreen,
} from "./views/BottomTabScreen";

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function Cealgull() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: { display: "none" },
            headerShown: false,
          }}
        >
          <Tab.Screen name="Home" component={HomeScreen}></Tab.Screen>
          <Tab.Screen name="Person" component={PersonScreen}></Tab.Screen>
          <Tab.Screen name="Publish" component={PublishScreen}></Tab.Screen>
          <Tab.Screen name="Topic" component={TopicScreen}></Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
