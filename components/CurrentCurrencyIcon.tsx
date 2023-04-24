import React from 'react';
import {Image} from "react-native";


interface CurrentCurrencyInterface {
    size?: number;
    style?: any;
}

const CurrentCurrencyIcon = ({size=20, style}:CurrentCurrencyInterface) => {
    return (
        <Image
            style={[{width: size, height: size}, style]}
            source={require("../assets/images/SplashScreen/diamond.gif")}
        />
    );
};

export default CurrentCurrencyIcon;