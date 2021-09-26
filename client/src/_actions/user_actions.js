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
} from './types';
import { url } from '../utils/axios'
import { USER_SERVER } from './config';


export function loginUser(dataToSubmit){

    const request = url.post(`${USER_SERVER}/login`, dataToSubmit)
        .then(response => response.data )
    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function findId(dataToSubmit){

    const request = url.post(`${USER_SERVER}/findId`, dataToSubmit)
        .then(response => response.data )
    return {
        type: FIND_ID,
        payload: request
    }
}

export function findPw(dataToSubmit){

    const request = url.post(`${USER_SERVER}/findPw`, dataToSubmit)
        .then(response => response.data )
    return {
        type: FIND_PW,
        payload: request
    }
}

export function updatePw(dataToSubmit){

    const request = url.post(`${USER_SERVER}/updatePw`, dataToSubmit)
        .then(response => response.data )
    return {
        type: UPDATE_PW,
        payload: request
    }
}

export function registerUser(dataToSubmit){

    const request = url.post(`${USER_SERVER}/register`, dataToSubmit)
        .then(response => response.data )
    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function editUser(dataToSubmit){

    const request = url.post(`${USER_SERVER}/edit`, dataToSubmit)
        .then(response => response.data )
    return {
        type: EDIT_USER,
        payload: request
    }
}

export function auth(){


    const request = url.get(`${USER_SERVER}/auth`, { withCredentials: true }
    ).then(response => response.data )
    return {
        type: AUTH_USER,
        payload: request
    }
}

export function logoutUser() {
    const request = url.get(`${USER_SERVER}/logout`)
        .then(response => response.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}


export function addToCart(id) {

    let body = {
        productId : id
    }

    const request = url.post(`${USER_SERVER}/addToCart`, body)
        .then(response => response.data);

    return {
        type: ADD_TO_CART,
        payload: request
    }
}

export function getDetailItem(productId) {

    const request = url.get(`${USER_SERVER}/products_by_id?id=${productId}&type=single`)
    .then(response => response.data);

    return {
        type: GET_DETAIL_ITEM,
        payload: request
    }
}

export function getCartItems(cartItems, userCart) {

    const request = url.get(`${USER_SERVER}/products_by_id?id=${cartItems}&type=array`)
        .then(response => {

            // CartItem들에 해당하는 정보들을 
            // Product Collection에서 가져온 후에
            // Quantity 정보를 넣어준다.

            userCart.forEach(cartItem => {
                console.log(userCart)
                response.data.forEach((productDetail, index) =>{
                    if(cartItem.id === productDetail._id){
                        response.data[index].quantity = cartItem.quantity
                    }
                })
            })
            return response.data;
        });

    return {
        type: GET_CART_ITEMS,
        payload: request
    }
}

export function removeCartItem(productId) {

    const request = url.get(`${USER_SERVER}/removeCart?id=${productId}`)
        .then(response => {
            //productInfo ,  cart 정보를 조합해서   CartDetail을 만든다. 
            response.data.cart.forEach(item => {
                response.data.productInfo.forEach((product, index) => {
                    if (item.id === product._id) {
                        response.data.productInfo[index].quantity = item.quantity
                    }

                })
            })
            return response.data;
        });

    return {
        type: REMOVE_CART_ITEM,
        payload: request
    }
}

export function onSuccessBuy(data) {

    const request = url.post(`${USER_SERVER}/successBuy`, data)
        .then(response => response.data);

    return {
        type: ON_SUCCESS_BUY,
        payload: request
    }
}