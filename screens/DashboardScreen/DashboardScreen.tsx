import React, {useRef, useState} from 'react';
import CommonScrollableLayout from "../../components/Layouts/CommonScrollableLayout";
import {Button, Text} from "native-base";
import Carousel from 'react-native-reanimated-carousel';
import 'react-native-reanimated';
import {View, PanResponder, Animated, Easing, Image} from "react-native";
import {heightPercentageToDP, widthPercentageToDP} from "react-native-responsive-screen";
import {checkUsersToken} from "../../store/actions/userAction";
import {useDispatch} from "react-redux";



const degreesToRadians = (degrees:any) => {
    return degrees * (Math.PI / 180);
};


const DashboardScreen = ({navigation}:any) => {
    const dispatch = useDispatch();



    const [swiped, setSwiped] = React.useState(false);
    const ref:any = React.useRef();


    const panResponder = React.useRef(
        PanResponder.create({
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
                const { dx, dy } = gestureState;
                return Math.abs(dx) > Math.abs(dy);
            },
            onPanResponderMove: (evt, gestureState) => {
                const {dx} = gestureState;
                if (dx > 0 && !swiped) {
                    ref?.current?.prev();
                    setSwiped(true);
                } else if (dx < 0 && !swiped) {
                    ref?.current?.next();
                    setSwiped(true);
                }
            }
        })
    ).current;


    // React.useEffect(() => {
    //     const intervalId = setInterval(() => {
    //         if (ref?.current?.next()) {
    //             ref?.current?.next();
    //         }
    //     }, 15000);
    //     return () => clearInterval(intervalId);
    // }, []);

    React.useEffect(() => {
        checkUsersToken({navigation})(dispatch);
    }, []);

    

    return (
        <CommonScrollableLayout>
            <View style={{flex: 1, justifyContent: "center"}}>
                <Carousel
                    ref={ref}
                    loop
                    mode={"horizontal-stack"}
                    modeConfig={{
                        snapDirection: "left",
                        stackInterval: 8,
                    }}
                    width={widthPercentageToDP(100) - 40}
                    height={heightPercentageToDP(60)}
                    data={[...new Array(6).keys()]}
                    scrollAnimationDuration={500}
                    renderItem={({ index }:{index:number}) => (
                        <View
                            {...panResponder.panHandlers}
                            style={{
                                backgroundColor: "#fff",
                                flex: 1,
                                borderRadius: 15,
                                padding: 20,
                                flexDirection: "column",
                                justifyContent: "space-between",
                            }}
                        >
                            <View>
                                <Text style={{ marginBottom: 10, lineHeight: 24, fontSize: 16, fontWeight: "bold", fontFamily: "PressStart2P-Regular"}}>
                                    Wheel Of Fortune
                                </Text>
                                <Image
                                    style={{width: "100%", height: 200, borderRadius: 10}}
                                    source={require("../../assets/images/wheel-of-fortune-wheel.gif")}
                                />
                            </View>
                            <Text style={{fontSize: 10, fontFamily: "PressStart2P-Regular"}}>
                                The goal of this game is to make your bets and get a result that will either add diamonds to your balance or, on the contrary, reduce it. You choose your bet.
                            </Text>

                            <Button
                                onPress={() => navigation.navigate("WheelOfFortuneScreen")}
                            >
                                <View style={{flexDirection: "row", alignItems: "center"}}>
                                    <Text style={{fontFamily: "PressStart2P-Regular",color: "#fff", marginRight: -5}}>Start Play</Text>
                                </View>
                            </Button>
                        </View>
                    )}
                />
            </View>
        </CommonScrollableLayout>
    );

};

export default DashboardScreen;