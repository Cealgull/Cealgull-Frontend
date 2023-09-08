/**
 * Type declaration of react-navigation.
 */
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeScreenProps, PersonScreenProps } from "@src/views/ForumTabScreens";
import {
  AccountScreenProps,
  PublishScreenProps,
  SettingScreenProps,
  TopicScreenProps,
} from "@src/views/RootStackScreens";
import { WelcomeViewProps } from "@src/views/WelcomeView";

/**
 * The root stack of cealgull.app
 */
export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  Welcome: WelcomeViewProps;
  Publish: PublishScreenProps;
  Topic: TopicScreenProps;
  Account: AccountScreenProps;
  Setting: SettingScreenProps;
};

export type MainTabParamList = {
  Home: HomeScreenProps;
  Person: PersonScreenProps;
};

export type LoginTabParamList = {
  UserLogin: undefined;
  UserAdd: undefined;
  WordSelect: undefined;
};

type TabScreenList = keyof MainTabParamList;
type StackScreenList = keyof RootStackParamList;
type LoginTabScreenList = keyof LoginTabParamList;

export type MainScreenPropsGeneric<Screen extends TabScreenList> =
  BottomTabScreenProps<MainTabParamList, Screen>;

export type StackScreenPropsGeneric<Screen extends StackScreenList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type LoginTabScreenPropsGeneric<Screen extends LoginTabScreenList> =
  BottomTabScreenProps<LoginTabParamList, Screen>;
