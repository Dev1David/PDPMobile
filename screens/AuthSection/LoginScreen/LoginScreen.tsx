import React from 'react';
import {Image, View} from "react-native";
import {Button, FormControl, Icon, Input, Pressable, Text, WarningOutlineIcon} from "native-base";
import CommonScrollableLayout from "../../../components/Layouts/CommonScrollableLayout";
import {styles} from "./loginStyles";
import {MaterialIcons} from "@expo/vector-icons";
import {SECONDARY_COLOR} from "../../../shared/colors";
import {useFormik} from "formik";
import * as Yup from "yup";
import instance from "../../../shared/axios";
import Toast from 'react-native-toast-message';
import {setToken} from "../../../shared/storage";
import {useDispatch} from "react-redux";
import {userTypes} from "../../../store/types";


interface LoginScreen {
    navigation: any
}

const LoginScreen = ({navigation}:LoginScreen) => {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            email: "daviddohru@gmail.com",
            password: "qwerty12as12AS",
            isLoading: false,
            show: false
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().email("Invalid Email").required("Email is required"),
            password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .max(20, 'Password max length is 20 characters')
                .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
                .matches(/\d+/, 'Password must contain at least one digit')
                .required('Password is required')
        }),
        onSubmit: values => {
            formik.setFieldValue("isLoading", true);
            console.log({
                email: values.email,
                password: values.password,
            });
            instance.post("/api/v1/users/login", {
                email: values.email,
                password: values.password,
            }, {})
                .then(async resp => {
                    if (resp.data) {
                        dispatch({
                            type: userTypes.CHECK_IS_VALID_USERS_TOKEN,
                            payload: resp.data,
                        });
                        await setToken(resp.data?.token);
                        navigation.navigate("BottomTabNavigator");
                    }

                })
                .catch(e => {
                    if (e?.response?.data?.message) {
                        Toast.show({
                            text1: "Error",
                            text2: e?.response?.data?.message,
                            type: "error",
                        });
                    }
                    console.log("ERR" , JSON.stringify(e));
                })
                .finally(() => formik.setFieldValue("isLoading", false));
        },
    })


    return (
        <CommonScrollableLayout>
            <View style={styles.container}>
                <Image
                    style={{width: 250, height: 250}}
                    source={require("../../../assets/images/AuthSection/pixel-art-waterfall.gif")}
                />
                <View style={styles.formContainer}>
                    <Text color={SECONDARY_COLOR} fontSize={"3xl"}>Please Log In</Text>
                    <FormControl isInvalid={!!formik.errors.email} marginTop={5}>
                        <FormControl.Label>Password</FormControl.Label>
                        <Input
                            marginTop={0}
                            color={SECONDARY_COLOR}
                            size="xl"
                            placeholder="Email"
                            value={formik.values.email}
                            onChangeText={t => formik.setFieldValue("email", t.toLowerCase())}
                        />
                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                            {formik.errors.email}
                        </FormControl.ErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!formik.errors.password} marginTop={5}>
                        <FormControl.Label>Email</FormControl.Label>
                        <Input
                            isInvalid={!!formik.errors.password}
                            onChangeText={t => formik.setFieldValue("password", t)}
                            value={formik.values.password}
                            size={"xl"}
                            color={SECONDARY_COLOR}
                            type={formik.values.show ? "text" : "password"}
                            InputRightElement={
                                <Pressable onPress={() => formik.setFieldValue("show", !formik.values.show)}>
                                    <Icon
                                        as={
                                            <MaterialIcons
                                                name={formik.values.show ? "visibility" : "visibility-off"}
                                            />
                                        }
                                        size={5}
                                        mr="2"
                                        color="muted.400"
                                    />
                                </Pressable>
                            }
                            placeholder="Password"
                        />

                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                            {formik.errors.password}
                        </FormControl.ErrorMessage>
                    </FormControl>
                    <Button
                        isLoading={formik.values.isLoading}
                        marginTop={5}
                        onPress={formik.submitForm}
                    >
                        Login
                    </Button>
                </View>
            </View>
        </CommonScrollableLayout>
    );
};

export default LoginScreen;