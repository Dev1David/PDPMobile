import {Image} from "react-native";

export const staticAvatars = [
    {
        id: 0,
        component: (style?:any) =>
            <Image source={require("../assets/images/Avatars/static/icons8-bmo-48.png")} style={[style]} />,
    },
    {
        id: 1,
        component: (style?:any) =>
            <Image source={require("../assets/images/Avatars/static/icons8-jerry-48.png")} style={[style]} />
    },
    {
        id: 2,
        component: (style?:any) =>
            <Image source={require("../assets/images/Avatars/static/icons8-bill-cipher-48.png")} style={[style]} />,
    },
    {
        id: 3,
        component: (style?:any) =>
            <Image source={require("../assets/images/Avatars/static/icons8-tom-48.png")} style={[style]} />
    },
    {
        id: 4,
        component: (style?:any) =>
            <Image source={require("../assets/images/Avatars/static/icons8-scooby-doo-48.png")} style={[style]} />
    },
    {
        id: 5,
        component: (style?:any) =>
            <Image source={require("../assets/images/Avatars/static/icons8-princess-bubblegum-48.png")} style={[style]} />,
    },
];