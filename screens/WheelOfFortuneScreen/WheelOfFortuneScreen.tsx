import React, {useRef} from 'react';
import {Image, Text, View} from "react-native";
import Roulette from "../../components/GameComponents/Roulette";
import CommonScrollableLayout from "../../components/Layouts/CommonScrollableLayout";
import {Button, FormControl, Input, WarningOutlineIcon, Modal} from "native-base";
import {SECONDARY_COLOR} from "../../shared/colors";
import {useFormik} from "formik";
import * as Yup from "yup";
import instance from "../../shared/axios";
import {getToken} from "../../shared/storage";
import {useDispatch} from "react-redux";
import {widthPercentageToDP} from "react-native-responsive-screen";
import CurrentCurrencyIcon from "../../components/CurrentCurrencyIcon";
import {checkUsersToken} from "../../store/actions/userAction";
import ToastMessage from "react-native-toast-message";

const participants = [
    '10%',
    '-10%',
    '20%',
    '-20%',
    '30%',
    '-30%',
    '40%',
    '-40%',
    'FREE',
];

const WheelOfFortuneScreen = ({navigation}:any) => {
    const dispatch = useDispatch();
    const childRef:any = useRef(null);
    const [winnerIndex, setWinnerIndex] = React.useState<any>();
    const [started, setStarted] = React.useState(false);
    const [isOpenAvatarModal, setIsOpenAvatarModal] = React.useState(false);
    const [isOpenResultModal, setIsOpenResultModal] = React.useState(false);
    const [result, setResult] = React.useState<any>({result:0, currentBalance:0});

    const formik = useFormik({
        initialValues: {
            betValues: "",
            winnerValue: "",
            isVisibleBetInput: false,
            isOpenResultModal: false,
        },
        validationSchema: Yup.object().shape({
            betValues: Yup.number()
                .min(10, "Should be at least 10")
                .max(10000, "Should be not more then 10000")
                .required("This field is required"),
        }),
        onSubmit: () => {
            childRef.current?._tryAgain();
            formik.setFieldValue("isVisibleBetInput", false);
        },
    })

    const wheelOptions = {
        rewards: participants,
        knobSize: 30,
        borderWidth: 5,
        borderColor: '#fff',
        innerRadius: 30,
        duration: 6000,
        backgroundColor: 'transparent',
        textAngle: 'horizontal',
        onRef: (ref:any) => childRef.current = ref,
    };

    const buttonPress = () => {
        setStarted(true);
        childRef.current?._onPress();
    };

    const onStartPlay = () => {
        setWinnerIndex(null);
        childRef?.current?._tryAgain();
    };


    function convertStringToNumber(str:string) {
        if (/^\d+$/.test(str)) {
            if (str.length > 1 && str[0] === "0") {
                str = ""
            }
            formik.setFieldValue("betValues", str);
        } else {
            formik.setFieldValue("betValues", "");
        }
    }






    return (
        <CommonScrollableLayout>
            <Modal isOpen={isOpenResultModal}>
                <Modal.Content>
                    <Modal.Header style={{alignItems: "center"}}>
                        <Text style={{marginTop: 7, fontSize: 18, fontFamily: "PressStart2P-Regular"}}>Your Result Is</Text>
                    </Modal.Header>
                    <View style={{
                        backgroundColor: "#fff",
                        width:"100%",
                        maxWidth: widthPercentageToDP(90),
                    }}>
                        <View
                            style={{
                                paddingHorizontal: 20,
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <View style={{marginVertical: 20, justifyContent: "center", flexDirection: "row"}}>
                                <Text style={{marginTop: 5, fontSize: 20, fontFamily: "PressStart2P-Regular"}}>
                                    {
                                        result?.result > 0 ?
                                            `+${result.result}`
                                            :
                                            result.result
                                    }
                                </Text>
                                <CurrentCurrencyIcon size={25} />
                            </View>
                            {
                                result?.result > 0 ?
                                    <Image
                                        style={{marginLeft: 30, marginVertical: 10, width: 130, height:170}}
                                        source={require("../../assets/images/meowth-pokemon.gif")}
                                    />
                                        :
                                    <Image
                                        style={{marginLeft: 30, marginVertical: 10, width: 140, height:140}}
                                        source={require("../../assets/images/pepe-meme.gif")}
                                    />
                            }
                        </View>
                        <Button onPress={async () => {
                            setIsOpenResultModal(false);
                            await checkUsersToken({navigation})(dispatch);
                        }}>
                            Ok
                        </Button>
                    </View>
                </Modal.Content>
            </Modal>
            <Roulette
                options={wheelOptions}
                getWinner={async (value:any, index:any) => {
                    const token = await getToken();
                    if (value === "FREE") {

                    } else {
                        try {
                            const resp =  await instance.post(
                                "/api/v1/roulette",
                                {
                                    percentage: +(value.slice(0, value.length - 1)),
                                    betBalance: formik.values.betValues
                                },
                                {
                                    headers: {
                                        Authorization: `Bearer ${token}`
                                    }
                                }
                            );

                            if (resp.status === 200) {
                                formik.setFieldValue("isOpenResultModal", true);
                                setIsOpenResultModal(true);
                                setResult(resp.data);
                                formik.resetForm();
                            }
                        } catch (e:any) {
                            ToastMessage.show({
                                type: "error",
                                text1: "Error",
                                text2: e?.message || "Something went wrong"

                            })
                        }
                    }
                }}
            />
            {
                formik.values.isVisibleBetInput &&
                <FormControl
                    style={{marginBottom: 10}}
                    isInvalid={
                        !!(formik.touched.betValues && formik.errors.betValues)
                    }
                    marginTop={5}
                >
                    <FormControl.Label>Yours bet</FormControl.Label>
                    <Input
                        marginTop={0}
                        color={SECONDARY_COLOR}
                        size="xl"
                        placeholder="Enter"
                        value={formik.values.betValues}
                        onChangeText={t => convertStringToNumber(t)}
                    />
                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                        {formik.errors.betValues}
                    </FormControl.ErrorMessage>
                </FormControl>
            }
            <Button
                onPress={async () => {
                    if (formik.values.isVisibleBetInput) {
                        await formik.submitForm();
                    } else {
                        await formik.setFieldValue("isVisibleBetInput", true);
                    }
                }}
            >
                {
                    formik.values.isVisibleBetInput ?
                        "Enter" : " Start"
                }
            </Button>
        </CommonScrollableLayout>
    );
};

export default WheelOfFortuneScreen;