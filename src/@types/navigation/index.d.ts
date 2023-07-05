import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

export type RootTabParamList = {
  Home: undefined;
  Person: undefined;
  Publish: undefined;
  Topic: undefined;
};

export type HomeViewNavigationProps = BottomTabScreenProps<
  RootTabParamList,
  "Home"
>;

export type PersonViewNavigationProps = BottomTabScreenProps<
  RootTabParamList,
  "Person"
>;

export type PublishViewNavigationProps = BottomTabScreenProps<
  RootTabParamList,
  "Publish"
>;

export type TopicViewNavigationProps = BottomTabScreenProps<
  RootTabParamList,
  "Topic"
>;

export interface HomeViewInterface {
  route: HomeViewNavigationProps["route"];
  navigation: HomeViewNavigationProps["navigation"];
}

export interface PersonViewInterface {
  route: PersonViewNavigationProps["route"];
  navigation: PersonViewNavigationProps["navigation"];
}

export interface PublishViewInterface {
  route: PublishViewNavigationProps["route"];
  navigation: PublishViewNavigationProps["navigation"];
}

export interface TopicViewInterface {
  route: TopicViewNavigationProps["route"];
  navigation: TopicViewNavigationProps["navigation"];
}
