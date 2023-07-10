import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  HomeScreenProps,
  PersonScreenProps,
  PublishScreenProps,
  TopicScreenProps,
  AccountScreenProps,
  SettingScreenProps,
} from "@src/views/BottomTabScreen";

type RootTabParamList = {
  Home: HomeScreenProps;
  Person: PersonScreenProps;
};

type RootStackParamList = {
  Main: undefined;
  Publish: PublishScreenProps;
  Topic: TopicScreenProps;
  Account: AccountScreenProps;
  Setting: SettingScreenProps;
};

type TabScreenList = keyof RootTabParamList;
type StackScreenList = keyof RootStackParamList;

export type TabScreenPropsGeneric<Screen extends TabScreenList> =
  BottomTabScreenProps<RootTabParamList, Screen>;

export type StackScreenPropsGeneric<Screen extends StackScreenList> =
  NativeStackScreenProps<RootStackParamList, Screen>;
