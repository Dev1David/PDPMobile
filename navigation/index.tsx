import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import {RootStackParamList} from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import BottomTabNavigator from "./BottomTabs";
import Toast, {SuccessToast, ErrorToast} from "react-native-toast-message";
import SplashScreen from "../screens/SplashScreen/SplashScreen";


export default function Navigation() {

  return (
      <>
        <NavigationContainer
          linking={LinkingConfiguration}
        >
          <RootNavigator />
        </NavigationContainer>
        <Toast config={toastConfig} />
      </>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
        <Stack.Screen
            options={() => ({headerShown: false})}
            name={"SplashScreen"}
            component={SplashScreen}
        />
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

const toastConfig = {
    success: (props: any) => (
        <SuccessToast {...props} />
    ),
    error: (props: any) => (
        <ErrorToast
            {...props}
        />
    ),
};
