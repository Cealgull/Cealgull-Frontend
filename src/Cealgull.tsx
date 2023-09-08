import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import {
  LoginTabParamList,
  RootStackParamList,
  MainTabParamList,
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
import { useState } from "react";
import { User } from "./models/User";
import { UserContext } from "./hooks/useUser";

const queryClient = new QueryClient();
const LoginTab = createBottomTabNavigator<LoginTabParamList>();
const ForumTab = createBottomTabNavigator<MainTabParamList>();
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
  const userContext = useState<User>();
  return (
    <UserContext.Provider value={userContext}>
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
                initialParams={{ id: "" }}
                component={TopicScreen}
              />
              <RootStack.Screen name="Setting" component={SettingScreen} />
              <RootStack.Screen name="Account" component={AccountScreen} />
            </RootStack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </QueryClientProvider>
    </UserContext.Provider>
  );
}
