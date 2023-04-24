import {adminTypes} from "../types";


type GetAllUsers = {type: "ADMIN_GET_ALL_USERS", payload:any};

type UserActions = GetAllUsers;

const defaultState = {
    usersList: [],
}

function adminReducer(state=defaultState, action: UserActions) {
    switch (action.type) {
        case adminTypes.ADMIN_GET_ALL_USERS:
            return {...state, usersList: action.payload};
        default:
            return state;
    }
}

export default adminReducer;