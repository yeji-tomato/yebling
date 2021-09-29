// import axios from 'axios'
import { PRODUCT_SERVER } from './config'
import {
    IMAGE_PRODUCT,
    UPLOAD_PRODUCT,
    GOODS_PRODUCT,
}   from './types';
// axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? '/' : 'https://yebling.herokuapp.com/';
import { url } from '../utils/axios';

export function imageProduct(dataToSubmit){

    const request = url.post(`${PRODUCT_SERVER}/image`, dataToSubmit)
        .then(response => response.data )
    return {
        type: IMAGE_PRODUCT,
        payload: request
    }
}

export function uploadProduct(dataToSubmit){

    const request = url.post(`${PRODUCT_SERVER}/upload`, dataToSubmit)
        .then(response => response.data )
    return {
        type: UPLOAD_PRODUCT,
        payload: request
    }
}

export function goodsProduct(dataToSubmit){

    const request = url.post(`${PRODUCT_SERVER}/goods`, { withCredentials: true }, dataToSubmit)
        .then(response => response.data )
    return {
        type: GOODS_PRODUCT,
        payload: request
    }
}



