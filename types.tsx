import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from "react";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  SplashScreen: undefined;
  LoginScreen: undefined;
  BottomTabNavigator: undefined;
  WheelOfFortuneScreen: undefined;
};

export type RootTabParamList = {

  DashboardScreen: undefined;
  ShopScreen: undefined;
  ProfileScreen: undefined;

  AdminScreen?: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;
