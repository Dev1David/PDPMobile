import React from "react";
import {Text, View} from "react-native";
import styles from "./splashStyles";
import HeartIcon from "../../assets/SplashScreen/heart_icon_white.svg";

const SplashScreen = () => {
    return (
        <View style={styles.container}>
            {/*<HeartIcon />*/}

            <Text style={{color: "red"}}>0000</Text>
        </View>
    );
};

export default SplashScreen;
