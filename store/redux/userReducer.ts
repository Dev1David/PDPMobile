import {userTypes} from "../types";

interface usersData {
    id: number;
}

type UserActionTypes = 'ADD_USER' | 'DELETE_USER';
type CheckUsersToken = {type: "CHECK_IS_VALID_USERS_TOKEN", payload: usersData};
type UpdateUserAvatar = {type: "UPDATE_USER_AVATAR_ID", payload: number};

type UserAction = CheckUsersToken | UpdateUserAvatar;



const defaultState = {
    user_info: {},
    chosen_avatar_id: 1,
}


function userReducer (state=defaultState, action: UserAction) {
    switch (action.type) {
        case userTypes.CHECK_IS_VALID_USERS_TOKEN:
            return ({
                ...state,
                user_info: action.payload,
            });
        case userTypes.UPDATE_USER_AVATAR_ID:
            return ({
                ...state,
                chosen_avatar_id: action.payload,
            });
        default:
            return state;
    }
}

export default userReducer;