import { HomeView } from "@src/views/HomeView";
import { PersonView } from "@src/views/PersonView";
import { PublishView } from "@src/views/PublishView";
import { TopicView } from "@src/views/TopicView";
import { RootTabParamList } from "@src/@types/navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

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
          <Tab.Screen name="Home" component={HomeView}></Tab.Screen>
          <Tab.Screen name="Person" component={PersonView}></Tab.Screen>
          <Tab.Screen name="Publish" component={PublishView}></Tab.Screen>
          <Tab.Screen name="Topic" component={TopicView}></Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
