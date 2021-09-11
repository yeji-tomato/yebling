import {
    LOGIN_USER, 
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER
} from '../_actions/types'


export default function user_reducer(state = {}, action) {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload }
        case REGISTER_USER:
            return { ...state, idcheckSuccess: action.payload }
        case AUTH_USER:
            return { ...state, userData: action.payload }
        case LOGOUT_USER:
            return { ...state, success: action.payload }
        default:
            return state;
    }
}