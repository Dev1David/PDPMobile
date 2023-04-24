import React, {ReactNode} from 'react';
import {ScrollView, StyleSheet, View} from "react-native";
import {PRIMARY_COLOR} from "../../shared/colors";
import {heightPercentageToDP} from "react-native-responsive-screen";

interface props {
    children: ReactNode,
}

const CommonScrollableLayout = ({children}:props) => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.innerContainer}>
                {children}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: PRIMARY_COLOR,
    },
    innerContainer: {
        flex: 1,
        minHeight: heightPercentageToDP(100) - 80 - 100,
        paddingHorizontal: 20,
        backgroundColor: PRIMARY_COLOR,
    }
})

export default CommonScrollableLayout;