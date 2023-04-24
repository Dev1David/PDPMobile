import {Dispatch} from "redux";
import axios from "../../shared/axios";
import {deleteToken, getToken, setToken} from "../../shared/storage";
import {userTypes} from "../types";

export const checkUsersToken = ({navigation, onSuccess}:any) =>
    async (dispatch:Dispatch) => {
        const currentUrl = "/api/v1/users/check";
        const token = await getToken();
        try {
            const resp = await axios.post(currentUrl,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (resp.data) {
                dispatch({
                    type: userTypes.CHECK_IS_VALID_USERS_TOKEN,
                    payload: resp.data,
                });
            }


            if (onSuccess) {
                onSuccess();
            }
        } catch (e:any) {
            if (e.response.status === 401) {
                await deleteToken();
                navigation.navigate("LoginScreen");
            }
        } finally {
            console.log("FINALLY");
        }
    }