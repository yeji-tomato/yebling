import {
    IMAGE_PRODUCT,
    UPLOAD_PRODUCT,
    GOODS_PRODUCT
} from '../_actions/types'


export default function product_reducer(state = {}, action) {
    switch (action.type) {
        case IMAGE_PRODUCT:
            return { ...state, success: action.payload }
        case UPLOAD_PRODUCT:
            return { ...state, success: action.payload }
        case GOODS_PRODUCT:
            return { ...state, success: action.payload }
        default:
            return state;
    }
}