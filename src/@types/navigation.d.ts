import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeViewProps } from "@src/views/HomeView";
import { PersonViewProps } from "@src/views/PersonView";
import { PublishViewProps } from "@src/views/PublishView";
import { TopicViewProps } from "@src/views/TopicView";

type RootTabParamList = {
  Home: HomeViewProps;
  Person: PersonViewProps;
};

type RootStackParamList = {
  Main: undefined;
  Publish: PublishViewProps;
  Topic: TopicViewProps;
};

type TabScreenList = keyof RootTabParamList;
type StackScreenList = keyof RootStackParamList;

export type TabScreenPropsGeneric<Screen extends TabScreenList> =
  BottomTabScreenProps<RootTabParamList, Screen>;

export type StackScreenPropsGeneric<Screen extends StackScreenList> =
  NativeStackScreenProps<RootStackParamList, Screen>;
