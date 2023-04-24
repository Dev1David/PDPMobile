import {StyleSheet} from "react-native";
import {heightPercentageToDP} from "react-native-responsive-screen";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        height: heightPercentageToDP(100),
    },
    formContainer: {
        marginTop: heightPercentageToDP(10),
        marginBottom: heightPercentageToDP(10),
    }
});