import {
    LOGIN_USER, 
    REGISTER_USER
} from '../_actions/types'


export default function user_reducer(state = {}, action) {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload }
            // break;
        case REGISTER_USER:
            return { ...state, idcheckSuccess: action.payload }
        
            // case REGISTER_USER:
        //     return { ...state, register: action.payload }
        //     break;
        // case AUTH_USER:
        //     return { ...state, userData: action.payload }
        //     break;
        default:
            return state;
    }
}