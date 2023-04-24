import {TouchableOpacity, View} from 'react-native';
import CommonScrollableLayout from "../../components/Layouts/CommonScrollableLayout";
import {useDispatch, useSelector} from "react-redux";
import {staticAvatars} from "../../shared/avatars";
import styles from "./profileStyles";
import React from "react";
import {Button, FormControl, Input, Modal, Switch, Text, WarningOutlineIcon} from "native-base";
import {PRIMARY_RED_COLOR, SECONDARY_COLOR} from "../../shared/colors";
import {useFormik} from "formik";
import * as Yup from "yup";
import instance from "../../shared/axios";
import {deleteToken, getToken, setAvatarId} from "../../shared/storage";
import ToastMessage from "react-native-toast-message";
import {userTypes} from "../../store/types";
import {CommonActions} from "@react-navigation/native";
import {widthPercentageToDP} from "react-native-responsive-screen";

export default function ProfileScreen({navigation}:any) {
  const dispatch = useDispatch();
  const selector:any = useSelector<any>((item) => item.users.user_info?.data);
  const userData:any = useSelector<any>((item) => item.users.user_info);
  const currentAvatarId:any = useSelector<any>(item => item.users?.chosen_avatar_id) || 0;
    const [isOpenChoseAvatarModal, setIsOpenChoseAvatarModal] = React.useState(false);

  React.useEffect(() => {
      console.log("SELECTOR", selector);
  }, []);

    const formik = useFormik({
        initialValues: {
            firstName: selector?.firstName || "",
            lastName: selector?.lastName || "",
            isPasswordUpdate: false,
            currentPassword: "",
            newPassword: "",
        },
        validationSchema: Yup.object().shape({
            firstName: Yup.string().min(2, "min length = 2").max(20, "max length = 20"),
            lastName: Yup.string().min(2, "min length = 2").max(20, "max length = 20"),
            // @ts-ignore
            currentPassword:  Yup.string().when(
                "isPasswordUpdate", {
                    is: true,
                    then: (schema:Yup.StringSchema) => schema
                        .min(6, 'Password must be at least 6 characters')
                        .max(20, 'Password max length is 20 characters')
                        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
                        .matches(/\d+/, 'Password must contain at least one digit')
                        .required("This field is required")
                }
            ),
            newPassword: Yup.string().when(
                "isPasswordUpdate", {
                    is: true,
                    then: (schema:Yup.StringSchema) => schema
                        .min(6, 'Password must be at least 6 characters')
                        .max(20, 'Password max length is 20 characters')
                        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
                        .matches(/\d+/, 'Password must contain at least one digit')
                        .required("This field is required")
                }
            ),
        }),
        onSubmit: async values => {
            const data:any = {
                firstName: values.firstName,
                lastName: values.lastName,
            };

            if (values.isPasswordUpdate) {
                data.currentPassword = values.currentPassword;
                data.newPassword = values.newPassword;
            }

            const token = await getToken();

           try {
               const response = await instance.put("/api/v1/users/update", data, {
                   headers: {
                       Authorization: `Bearer ${token}`
                   }
               });

               const reduxData = {
                   ...userData,
                   data: response.data
               };

               await formik.setFieldValue("currentPassword", "");
               await formik.setFieldValue("newPassword", "");
               await formik.setFieldValue("isPasswordUpdate", false);

               ToastMessage.show({
                    text1: "Success",
                    text2: "Data was success updated",
                    type: "success",
               });

               dispatch({
                   type: userTypes.CHECK_IS_VALID_USERS_TOKEN,
                   payload: reduxData,
               });

           } catch (e:any) {
               ToastMessage.show({
                    text1: "Error",
                    text2: e.response?.data?.message || "Something went wrong",
                    type: "error",
               });
           }



            console.log("VALUES", values);
            console.log("DATA <<<", data);
        },
  });

  return (
      <CommonScrollableLayout>
          <Modal isOpen={isOpenChoseAvatarModal}>
              <Modal.Content>
                  <Modal.Header>
                      <Text style={{marginTop: 7, fontSize: 12, fontFamily: "PressStart2P-Regular"}}>Select an avatar</Text>
                      <Modal.CloseButton onPress={() => setIsOpenChoseAvatarModal(false)} />
                  </Modal.Header>
                  <View style={{
                      maxWidth: widthPercentageToDP(90),
                      backgroundColor: "#fff",
                      flexDirection: "row",
                      flexWrap: "wrap",
                  }}>
                      {
                          staticAvatars.map(val => (
                              <TouchableOpacity
                                  onPress={async () => {
                                      dispatch({
                                          type: userTypes.UPDATE_USER_AVATAR_ID,
                                          payload: val.id,
                                      });
                                      await setAvatarId(val.id);
                                      setIsOpenChoseAvatarModal(false);
                                  }}
                                  style={{
                                      padding: 10,
                                      borderRadius: 10,
                                      margin: 10,
                                      borderWidth: 4,
                                      borderColor:
                                          currentAvatarId === val?.id ?
                                              "#06b6d4" : "#fff"
                                  }}
                                  key={val.id}
                              >
                                  {val.component()}
                              </TouchableOpacity>
                          ))
                      }
                  </View>
              </Modal.Content>
          </Modal>
          <View style={{marginTop: 30, alignItems: "center"}}>
              <TouchableOpacity
                  onPress={() => setIsOpenChoseAvatarModal(true)}
                  style={[
                      styles.avatarsContainer,
                      selector?.role?.roleName === "ADMIN" ?
                          styles.avatarContainerBorderAdmin
                          :
                          selector?.role?.roleName === "VIP_USER" ?
                              styles.avatarContainerBorderVip
                              :
                              styles.avatarContainerBorderUser

                  ]}
              >
                  {staticAvatars[currentAvatarId].component({width: 65, height: 65})}
              </TouchableOpacity>
              <Text style={
                  selector?.role?.roleName === "ADMIN" ?
                      styles.roleTextAdmin
                      :
                      selector?.role?.roleName === "VIP_USER" ?
                          styles.roleTextVipUser
                          :
                          styles.roleTextUser
              }
              >
                  {
                      selector?.role?.roleName === "ADMIN" ?
                          "Admin"
                          :
                          selector?.role?.roleName === "VIP_USER" ?
                              "Vip Account"
                              :
                              "User"

                  }
              </Text>
          </View>
          <View>
              <FormControl isInvalid={!!formik.errors.firstName} marginTop={5}>
                  <FormControl.Label>First Name</FormControl.Label>
                  <Input
                      marginTop={0}
                      color={SECONDARY_COLOR}
                      size="xl"
                      placeholder="Enter"
                      value={formik.values.firstName}
                      onChangeText={t => formik.setFieldValue("firstName", t)}
                  />
                  <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                      {formik.errors.firstName}
                  </FormControl.ErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!formik.errors.lastName} marginTop={5}>
                  <FormControl.Label>Last Name</FormControl.Label>
                  <Input
                      marginTop={0}
                      color={SECONDARY_COLOR}
                      size="xl"
                      placeholder="Enter"
                      value={formik.values.lastName}
                      onChangeText={t => formik.setFieldValue("lastName", t)}
                  />
                  <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                      {formik.errors.lastName}
                  </FormControl.ErrorMessage>
              </FormControl>
              <View style={{flexDirection: "row", alignItems: "center", marginTop: 20}}>
                  <Switch
                      value={formik.values.isPasswordUpdate}
                      onToggle={() => {
                          formik.setFieldValue("isPasswordUpdate", !formik.values.isPasswordUpdate)
                      }}
                      size="sm"
                  />
                  <Text style={{marginLeft: 5, fontSize: 12, color: "#fff", fontFamily: "PressStart2P-Regular",}}>Change Password</Text>
              </View>
              {
                  formik.values.isPasswordUpdate &&
                  <>
                      <FormControl isInvalid={!!formik.errors.currentPassword} marginTop={5}>
                          <FormControl.Label>Current Password</FormControl.Label>
                          <Input
                              type={"password"}
                              marginTop={0}
                              color={SECONDARY_COLOR}
                              size="xl"
                              placeholder="Enter"
                              value={formik.values.currentPassword}
                              onChangeText={t => formik.setFieldValue("currentPassword", t)}
                          />
                          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                              {formik.errors.currentPassword}
                          </FormControl.ErrorMessage>
                      </FormControl>
                      <FormControl isInvalid={!!formik.errors.newPassword} marginTop={2}>
                          <FormControl.Label>New Password</FormControl.Label>
                          <Input
                              type={"password"}
                              marginTop={0}
                              color={SECONDARY_COLOR}
                              size="xl"
                              placeholder="Enter"
                              value={formik.values.newPassword}
                              onChangeText={t => formik.setFieldValue("newPassword", t)}
                          />
                          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                              {formik.errors.newPassword}
                          </FormControl.ErrorMessage>
                      </FormControl>
                  </>
              }
              <Button
                  onPress={formik.submitForm}
                  disabled={!formik.dirty}
                  marginTop={10}
              >
                  <Text style={{color: "#fff", fontFamily: "PressStart2P-Regular",}}>
                      Save Changes
                  </Text>
              </Button>

              <Button
                  marginTop={5}
                  marginBottom={100}
                  backgroundColor={PRIMARY_RED_COLOR}
                  onPress={async () => {
                      await deleteToken();
                      navigation.dispatch(
                          CommonActions.reset({
                              index: 0,
                              routes: [{
                                  name: "LoginScreen"
                              }]
                          })
                      )
                      //navigation.navigate("LoginScreen");
                  }}
              >
                  <Text style={{fontFamily: "PressStart2P-Regular"}}>Log Out</Text>
              </Button>
          </View>
      </CommonScrollableLayout>
  );
}

