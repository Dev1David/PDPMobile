import React from "react";
import {Image, Text, View} from "react-native";
import styles from "./splashStyles";
import {PROJECT_NAME, SPLASH_SCREEN_TIME} from "../../shared/constants";
import {deleteToken, getAvatarId, getToken} from "../../shared/storage";
import {checkUsersToken} from "../../store/actions/userAction";
import {useDispatch} from "react-redux";
import {userTypes} from "../../store/types";


interface Navigation {
    navigation: any
}

const SplashScreen = ({navigation}: Navigation) => {
    const dispatch = useDispatch();
    React.useEffect(() => {
        setTimeout(() => {
            (async () => {
                //await deleteToken();
                const token = await getToken();
                if (token === null) {
                    navigation.navigate("LoginScreen");
                } else {
                    const onSuccess = () => {
                        navigation.navigate("BottomTabNavigator");
                    }
                    await checkUsersToken({navigation, onSuccess})(dispatch);
                }
                const userAvatarId = await getAvatarId();
                if (userAvatarId === null) {
                    dispatch({
                        type: userTypes.UPDATE_USER_AVATAR_ID,
                        payload: 0,
                    });
                } else {
                    dispatch({
                        type: userTypes.UPDATE_USER_AVATAR_ID,
                        payload: +userAvatarId,
                    });
                }
            })()
        }, SPLASH_SCREEN_TIME);
    }, []);
    return (
        <View style={styles.container}>
            <Image style={{width: 80, height: 80}} source={require("../../assets/images/SplashScreen/diamond.gif")}/>
            <Text style={styles.text}>{PROJECT_NAME}</Text>
        </View>
    );
};

export default SplashScreen;
