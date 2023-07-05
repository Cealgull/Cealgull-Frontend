import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

import { HomeViewProps } from "@src/views/HomeView";
import { PersonViewProps } from "@src/views/PersonView";
import { PublishViewProps } from "@src/views/PublishView";
import { TopicViewProps } from "@src/views/TopicView";

type RootTabParamList = {
  Home: HomeViewProps;
  Person: PersonViewProps;
  Publish: PublishViewProps;
  Topic: TopicViewProps;
};

type ScreenList = keyof RootTabParamList;

export type ScreenPropsGeneric<Screen extends ScreenList> =
  BottomTabScreenProps<RootTabParamList, Screen>;
