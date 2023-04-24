import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import {RootStackParamList} from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import BottomTabNavigator from "./BottomTabs";
import Toast, {SuccessToast, ErrorToast} from "react-native-toast-message";
import SplashScreen from "../screens/SplashScreen/SplashScreen";
import LoginScreen from "../screens/AuthSection/LoginScreen/LoginScreen";
import WheelOfFortuneScreen from "../screens/WheelOfFortuneScreen/WheelOfFortuneScreen";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import CurrentCurrencyIcon from "../components/CurrentCurrencyIcon";
import {staticAvatars} from "../shared/avatars";
import {Feather, Ionicons} from "@expo/vector-icons";
import {useDispatch, useSelector} from "react-redux";


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
   const selector:any = useSelector<any>((item) => item.users.user_info.data);

  return (
    <Stack.Navigator>
        <Stack.Screen
            options={() => ({headerShown: false})}
            name={"SplashScreen"}
            component={SplashScreen}
        />
        <Stack.Screen
            name={"LoginScreen"}
            component={LoginScreen}
            options={() => ({headerShown: false})}
        />
        <Stack.Screen
            name={"BottomTabNavigator"}
            component={BottomTabNavigator}
            options={() => ({headerShown: false})}
        />
        <Stack.Screen
            options={({navigation}) => ({
                headerTitle: "",
                headerStyle: {
                    backgroundColor: "#06b6d4",
                    flexDirection: "row",
                    alignItems: "center",
                },
                headerShown: true,
                headerRight: () => (
                    <View style={{paddingHorizontal: 15, flexDirection: "row", alignItems: "center"}}>
                        <Text style={{fontFamily: "PressStart2P-Regular", marginTop: 5, color: "#fff", marginRight: 5}}>
                            {selector?.balance}
                        </Text>
                        <CurrentCurrencyIcon />
                    </View>
                ),
                headerLeft: () => (
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.goBackContainer}
                    >
                        <Ionicons name="md-chevron-back" size={30} color="#fff" />
                    </TouchableOpacity>
                ),
            })}
            name={"WheelOfFortuneScreen"}
            component={WheelOfFortuneScreen}
        />
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

const styles = StyleSheet.create({
    goBackContainer: {
        padding: 5
    },
});
