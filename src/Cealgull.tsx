import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import {
  LoginTabParamList,
  MainTabParamList,
  RootStackParamList,
} from "@src/@types/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { HomeScreen, PersonScreen } from "./views/ForumTabScreens";
import {
  LoginScreen,
  UserAddScreen,
  WordSelectScreen,
} from "./views/LoginTabScreens";
import {
  AccountScreen,
  PublishScreen,
  SettingScreen,
  TopicScreen,
} from "./views/RootStackScreens";
import { useState } from "react";
import { User } from "./models/User";
import { UserContext } from "./hooks/useUser";
import WelcomeScreen from "./views/RootStackScreens/WelcomeScreen";
import { ProductionInfoScreen } from "./views/ForumTabScreens/ProductInfoScreen";
import StatisticsScreen from "./views/ForumTabScreens/StatisticsScreen";

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

const RootStackScreen: React.FC = () => {
  return (
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
      <RootStack.Screen name="Topic" component={TopicScreen} />
      <RootStack.Screen name="Setting" component={SettingScreen} />
      <RootStack.Screen name="Account" component={AccountScreen} />
      <RootStack.Screen
        name="ProductionInfo"
        component={ProductionInfoScreen}
      />
      <RootStack.Screen name="Statistics" component={StatisticsScreen} />
      <RootStack.Screen name="Welcome" component={WelcomeScreen} />
    </RootStack.Navigator>
  );
};

export default function Cealgull() {
  const userContext = useState<User>();
  return (
    <UserContext.Provider value={userContext}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <NavigationContainer>
            <RootStackScreen />
          </NavigationContainer>
        </SafeAreaProvider>
      </QueryClientProvider>
    </UserContext.Provider>
  );
}
