import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Home: undefined;
  Person: undefined;
  Publish: undefined;
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
