import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import {
  LoginTabParamList,
  RootStackParamList,
  RootTabParamList,
} from "@src/@types/navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { HomeScreen, PersonScreen } from "./views/ForumTabScreens";
import {
  AccountScreen,
  PublishScreen,
  SettingScreen,
  TopicScreen,
} from "./views/RootStackScreens";
import {
  WordSelectScreen,
  LoginScreen,
  UserAddScreen,
} from "./views/LoginTabScreens";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
const LoginTab = createBottomTabNavigator<LoginTabParamList>();
const ForumTab = createBottomTabNavigator<RootTabParamList>();
const RootStack = createStackNavigator<RootStackParamList>();

const LoginTabsScreen = () => {
  return (
    <LoginTab.Navigator
      screenOptions={{
        tabBarStyle: { display: "none" },
        headerShown: false,
        unmountOnBlur: true,
      }}
    >
      <LoginTab.Screen name="UserLogin" component={LoginScreen} />
      <LoginTab.Screen name="UserAdd" component={UserAddScreen} />
      <LoginTab.Screen name="WordSelect" component={WordSelectScreen} />
    </LoginTab.Navigator>
  );
};

const ForumTabsScreen = () => {
  return (
    <ForumTab.Navigator
      screenOptions={{
        tabBarStyle: { display: "none" },
        headerShown: false,
        unmountOnBlur: true,
      }}
    >
      <ForumTab.Screen name="Person" component={PersonScreen} />
      <ForumTab.Screen name="Home" component={HomeScreen} />
    </ForumTab.Navigator>
  );
};

export default function Cealgull() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <NavigationContainer>
          <RootStack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <RootStack.Screen name="Login" component={LoginTabsScreen} />
            <RootStack.Screen
              name="Main"
              component={ForumTabsScreen}
              options={{ gestureEnabled: false }}
            />
            <RootStack.Screen
              name="Publish"
              options={{
                gestureDirection: "vertical",
                cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
              }}
              component={PublishScreen}
            />
            <RootStack.Screen
              name="Topic"
              initialParams={{ tid: "" }}
              component={TopicScreen}
            />
            <RootStack.Screen name="Setting" component={SettingScreen} />
            <RootStack.Screen name="Account" component={AccountScreen} />
          </RootStack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
