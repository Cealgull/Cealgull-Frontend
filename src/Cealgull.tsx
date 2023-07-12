import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import {
  RootStackParamList,
  RootTabParamList,
  LoginTabParamList,
} from "@src/@types/navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  AccountScreen,
  HomeScreen,
  PersonScreen,
  PublishScreen,
  SettingScreen,
  TopicScreen,
} from "./views/BottomTabScreen";
import LoginView from "./views/LoginView/LoginView";
import UserAddScreen from "./views/UserAddScreen";
import WordSelectView from "./views/WordSelectView";

const LoginTab = createBottomTabNavigator<LoginTabParamList>();
const ForumTab = createBottomTabNavigator<RootTabParamList>();
const Stack = createStackNavigator<RootStackParamList>();

const LoginTabsScreen = () => {
  return (
    <LoginTab.Navigator
      screenOptions={{
        tabBarStyle: { display: "none" },
        headerShown: false,
      }}
    >
      <LoginTab.Screen name="UserLogin" component={LoginView} />
      <LoginTab.Screen name="UserAdd" component={UserAddScreen} />
      <LoginTab.Screen name="WordSelect" component={WordSelectView} />
    </LoginTab.Navigator>
  );
};

const FourmTabsScreen = () => {
  return (
    <ForumTab.Navigator
      screenOptions={{
        tabBarStyle: { display: "none" },
        headerShown: false,
      }}
    >
      <ForumTab.Screen name="Person" component={PersonScreen}></ForumTab.Screen>
      <ForumTab.Screen name="Home" component={HomeScreen}></ForumTab.Screen>
    </ForumTab.Navigator>
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
          <Stack.Screen name="Login" component={LoginTabsScreen}></Stack.Screen>
          <Stack.Screen
            name="Main"
            component={FourmTabsScreen}
            options={{ gestureEnabled: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="Publish"
            options={{
              gestureDirection: "vertical",
              cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
            }}
            component={PublishScreen}
          ></Stack.Screen>
          <Stack.Screen name="Topic" component={TopicScreen}></Stack.Screen>
          <Stack.Screen name="Setting" component={SettingScreen}></Stack.Screen>
          <Stack.Screen name="Account" component={AccountScreen}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
