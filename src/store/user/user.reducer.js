import { USER_ACTION_TYPES } from "./user.types";

const INITIAL_STATE = {
    currentUser: null,
    isLoading: false,
    error: null
}

export const userReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;
    switch(type){
        case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                currentUser: payload
            }
        case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser: null,
            }
        case USER_ACTION_TYPES.SIGN_IN_FAILED:
        case USER_ACTION_TYPES.SIGN_UP_FAILED:
        case USER_ACTION_TYPES.SIGN_OUT_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload
            }
        default:
            return state
    }
}

// CHECK_USER_SESSION: 'user/CHECK_USER_SESSION',
//     GOOGLE_SIGN_IN_START: 'user/GOOGLE_SIGN_IN_START',
//     EMAIL_SIGN_IN_START: 'user/EMAIL_SIGN_IN_START',
//     SIGN_IN_SUCCESS: 'user/SIGN_IN_SUCCESS',
//     SIGN_IN_FAILED: 'user/SIGN_IN_FAILED',