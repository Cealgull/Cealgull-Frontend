import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Home: undefined;
  Person: undefined;
  Publish: undefined;
  Topic: undefined;
};

export type HomeViewNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  "Home"
>;

export type PersonViewNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  "Person"
>;

export type PublishViewNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  "Publish"
>;

export type TopicViewNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  "Topic"
>;

export interface HomeViewInterface {
  route: HomeViewNavigationProps["route"];
  navigation: HomeViewNavigationProps["navigation"];
}

export interface PersonViewInterface {
  route: PersonViewNavigationProps["route"];
  navigation: HomeViewNavigationProps["navigation"];
}

export interface PublishViewInterface {
  route: PublishViewNavigationProps["route"];
  navigation: PublishViewNavigationProps["navigation"];
}

export interface TopicViewInterface {
  route: TopicViewNavigationProps["route"];
  navigation: TopicViewNavigationProps["navigation"];
}
