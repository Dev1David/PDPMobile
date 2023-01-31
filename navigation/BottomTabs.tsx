import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {RootTabParamList, RootTabScreenProps} from "../types";
import TabOneScreen from "../screens/TabOneScreen";
import {FontAwesome} from "@expo/vector-icons";
import TabTwoScreen from "../screens/TabTwoScreen";
import * as React from "react";

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {

    return (
        <BottomTab.Navigator
            initialRouteName="TabOne"
            screenOptions={{}}
        >
            <BottomTab.Screen
                name="TabOne"
                component={TabOneScreen}
                options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
                    title: 'Tab One',
                    tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />
})}
    />
    <BottomTab.Screen
    name="TabTwo"
    component={TabTwoScreen}
    options={{
        title: 'Tab Two',
            tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
    }}
    />
    </BottomTab.Navigator>
);
}

function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
}) {
    return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}

export default BottomTabNavigator;
