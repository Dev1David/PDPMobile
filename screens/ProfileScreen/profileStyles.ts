import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    avatarsContainer: {
        backgroundColor: "#fff",
        marginHorizontal: 15,
        borderRadius: 55,
        padding: 15,
        maxWidth: 105,
    },
    avatarContainerBorderAdmin: {
        borderWidth: 5,
        borderColor: "red"
    },
    avatarContainerBorderVip: {
        borderWidth: 5,
        borderColor: "green"
    },
    avatarContainerBorderUser: {
        borderWidth: 5,
        borderColor: "yellow"
    },
    roleTextAdmin: {
        color: "red",
        fontFamily: "PressStart2P-Regular",
        marginVertical: 10,
    },
    roleTextVipUser: {
        color: "green",
        fontFamily: "PressStart2P-Regular",
        marginVertical: 10,
    },
    roleTextUser: {
        color: "yellow",
        fontFamily: "PressStart2P-Regular",
        marginVertical: 10,
    },
});

export default styles;