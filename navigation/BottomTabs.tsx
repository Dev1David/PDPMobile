import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {RootTabParamList, RootTabScreenProps} from "../types";
import ShopScreen from "../screens/ShopScreen/ShopScreen";
import {FontAwesome} from "@expo/vector-icons";
import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";
import * as React from "react";
import DashboardScreen from "../screens/DashboardScreen/DashboardScreen";
import {PRIMARY_COLOR, SECONDARY_COLOR} from "../shared/colors";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import rootReducer from "../store/redux";
import CurrentCurrencyIcon from "../components/CurrentCurrencyIcon";
import {staticAvatars} from "../shared/avatars";
import AdminScreen from "../screens/AdminScreen/AdminScreen";

const BottomTab = createBottomTabNavigator<RootTabParamList>();

type RootState = ReturnType<typeof rootReducer>
function BottomTabNavigator() {
    const dispatch = useDispatch();
    const selector:any = useSelector<any>((item) => item.users.user_info.data);
    const currentAvatarId:any = useSelector<any>(item => item.users?.chosen_avatar_id) || 0;

    React.useEffect(() => {
        console.log("!!!!", selector);
    }, []);

    return (
        <BottomTab.Navigator
            initialRouteName="DashboardScreen"
            screenOptions={{
                tabBarStyle: {
                    height: 80
                },
                headerStyle: {
                    height: 100,
                    backgroundColor: SECONDARY_COLOR,
                }
            }}
        >
            <BottomTab.Screen
                name={"DashboardScreen"}
                component={DashboardScreen}
                options={({ navigation }: RootTabScreenProps<'DashboardScreen'>) => ({
                    headerTitleStyle: {
                        display: "none"
                    },
                    headerBackgroundContainerStyle: {
                        backgroundColor: "#06b6d4",
                        flexDirection: "row",
                        alignItems: "center",
                    },
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
                            style={styles.avatarsContainer}
                        >
                            {staticAvatars[currentAvatarId].component({width: 26, height: 26})}
                        </TouchableOpacity>
                    ),
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color,focused }) =>
                        <TabBarIcon
                            focused={focused}
                            name="home"
                            color={color}
                            title={"Home"}
                        />
                })}
            />
            <BottomTab.Screen
                name="ShopScreen"
                component={ShopScreen}
                options={({ navigation }: RootTabScreenProps<'ShopScreen'>) => ({
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color, focused }) =>
                        <TabBarIcon
                            focused={focused}
                            name="shopping-cart"
                            color={color}
                            title={"  Store"}
                        />
                })}
            />
            <BottomTab.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={{
                    headerBackgroundContainerStyle: {
                        backgroundColor: "#06b6d4",
                        flexDirection: "row",
                        alignItems: "center",
                    },
                    title: "Profile",
                    headerTitleStyle: {
                        fontFamily: "PressStart2P-Regular",
                        color: "#fff"
                    },
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color, focused }) =>
                        <TabBarIcon
                            focused={focused}
                            name="user"
                            color={color}
                            title={"Profile"}
                        />,
                }}
            />
            {
                selector?.role?.roleName === "ADMIN" &&
                <BottomTab.Screen
                    name={"AdminScreen"}
                    component={AdminScreen}
                    options={{
                        title: "All Users",
                        tabBarShowLabel: false,
                        tabBarIcon: ({ color, focused }) =>
                            <TabBarIcon
                                focused={focused}
                                name="user-secret"
                                color={color}
                                title={"Admin"}
                            />,
                    }}
                />
            }
        </BottomTab.Navigator>
    );
}

function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
    focused: boolean;
    title: string;
}) {
    return (
        <View style={{marginTop: 10, alignItems: "center"}}>
            <FontAwesome
                size={30}
                style={{ marginBottom: -3 }}
                {...props}
                color={props.focused ? "#06b6d4" : PRIMARY_COLOR}
            />
            <Text
                style={{
                    fontFamily: "PressStart2P-Regular",
                    fontSize: 6,
                    marginTop: 6,
                    color: props.focused ? "#06b6d4" : PRIMARY_COLOR
                }}>
                {props.title}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    avatarsContainer: {
        backgroundColor: "#fff",
        marginHorizontal: 15,
        borderColor: "#fff",
        borderWidth:3,
        borderRadius: 50,
        padding: 5
    },
})

export default BottomTabNavigator;
