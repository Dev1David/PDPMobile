import {StyleSheet} from "react-native";
import {PRIMARY_COLOR} from "../../shared/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: PRIMARY_COLOR,
    },
    text: {
        color: "#fff",
        marginTop: 25,
        fontSize: 24,
    }
});

export default styles;
