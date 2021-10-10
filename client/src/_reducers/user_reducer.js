import {
    LOGIN_USER, 
    FIND_ID,
    FIND_PW,
    UPDATE_PW,
    REGISTER_USER,
    EDIT_USER,
    AUTH_USER,
    LOGOUT_USER,
    GET_DETAIL_ITEM,
    ADD_TO_CART,
    GET_CART_ITEMS,
    REMOVE_CART_ITEM,
    ON_SUCCESS_BUY
} from '../_actions/types'


export default function user_reducer(state = {}, action) {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload }
        case FIND_ID:
            return { ...state, success: action.payload }
        case FIND_PW:
            return { ...state, success: action.payload }
        case UPDATE_PW:
            return { ...state, success: action.payload }
        case REGISTER_USER:
            return { ...state, idcheckSuccess: action.payload }
        case EDIT_USER:
            return { ...state, success: action.payload }
        case AUTH_USER:
            return { ...state, userData: action.payload }
        case LOGOUT_USER:
            return { ...state, success: action.payload }
        case GET_DETAIL_ITEM:
            return { ...state }
        case ADD_TO_CART:
            return { ...state,
                     userData: {
                         ...state.userData,
                         cart: action.payload
                     }
            }
        case GET_CART_ITEMS:
            return { ...state, cartDetail : action.payload }
        case REMOVE_CART_ITEM:
            return { ...state, cartDetail : action.payload.productInfo, 
                    userData: {
                        ...state.userData,
                        cart: action.payload.cart
                    }    
            }
        case ON_SUCCESS_BUY:
            return {
                ...state, cartDetail: action.payload.cartDetail,
                userData: {
                    ...state.userData, cart: action.payload.cart
                }
            }
        default:
            return state;
    }
}