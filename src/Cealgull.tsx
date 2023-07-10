import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import { RootStackParamList, RootTabParamList } from "@src/@types/navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  HomeScreen,
  PersonScreen,
  PublishScreen,
  TopicScreen,
} from "./views/BottomTabScreen";

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createStackNavigator<RootStackParamList>();

const MainScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { display: "none" },
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen}></Tab.Screen>
      <Tab.Screen name="Person" component={PersonScreen}></Tab.Screen>
    </Tab.Navigator>
  );
};

export default function Cealgull() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Main" component={MainScreen}></Stack.Screen>
          <Stack.Screen
            name="Publish"
            options={{
              gestureDirection: "vertical",
              cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
            }}
            component={PublishScreen}
          ></Stack.Screen>
          <Stack.Screen
            name="Topic"
            options={{
              gestureDirection: "horizontal",
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
            component={TopicScreen}
          ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
