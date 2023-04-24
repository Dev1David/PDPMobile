import AsyncStorage from '@react-native-async-storage/async-storage';
import {STORAGE_CONSTANTS} from "./constants";

export const getToken = async ():Promise<string | null>=> {
    const result = await AsyncStorage.getItem(STORAGE_CONSTANTS.ACCESS_TOKEN);
    return result ? JSON.parse(result) : null;
};

export const setToken = async (token:string):Promise<void> => {
    await AsyncStorage.setItem(STORAGE_CONSTANTS.ACCESS_TOKEN, JSON.stringify(token));
};

export const deleteToken = async ():Promise<void> => {
    await AsyncStorage.removeItem(STORAGE_CONSTANTS.ACCESS_TOKEN);
};

export const getAvatarId = async ():Promise<string | null>=> {
    const result = await AsyncStorage.getItem(STORAGE_CONSTANTS.AVATAR_ID);
    return result ? JSON.parse(result) : null;
}

export const setAvatarId = async (id:number):Promise<void>=> {
    await AsyncStorage.setItem(STORAGE_CONSTANTS.AVATAR_ID, JSON.stringify(id));
}

export const deleteAvatarId = async ():Promise<void> => {
    await AsyncStorage.removeItem(STORAGE_CONSTANTS.AVATAR_ID);
}